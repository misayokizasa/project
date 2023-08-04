import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RefrenshtokenService } from 'src/user/refrenshtoken.service';

@Injectable()
export class AuthService {
  private currentDate: Date;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private refreshtokenService: RefrenshtokenService,
  ) { }

  async validateUser(username: string, password: string){
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))){
      const{password, ...result} = user;
      return result;
    }
    return null;
  }

  async signin(data: CreateUserDto) {
    const user = await this.userService.findOneWithUserName(data.username);
    const tokens = await this.getTokens(user.id, user.username);
    const date = this.currentDate = new Date() 
    let refresh = {
      created: date,
      updated: date,
      active: true,
      active_sum: 0,
      refresh_token: tokens.refreshToken,
      ttl:7*24*60*60,
      user_id: user.id,
    };
    await this.refreshtokenService.create(refresh)
    return {tokens};
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string,req) {
    const refreshToken2 = req.headers.authorization.replace('Bearer', '').trim(); 
    const user = await this.userService.findOne(userId);
    const tokens = await this.getTokens(userId, user.username);
    const refreshs = await this.refreshtokenService.findOne(refreshToken2)
    refreshs.active_sum++;
    await this.updateRefreshToken(refreshs.id,refreshs.active_sum)
    if(!refreshs.active){      
      return {"message": "The refresh token has already been used."}
    }
    const date = this.currentDate = new Date()
    let refresh = {
      created: date,
      updated: date,
      active: true,
      active_sum: 0,
      refresh_token: tokens.refreshToken,
      ttl:7*24*60*60,
      user_id: user.id,
    };     
    await this.refreshtokenService.create(refresh)
    return tokens;
  }

  async updateRefreshToken(refreshsId: number, count: number) {
    const date = this.currentDate = new Date()
    await this.refreshtokenService.update(refreshsId, {
      active_sum: count,
      active:false,
      updated:date,
    });   
  }
  
  async logout(req:any) {
    const refreshs = await this.refreshtokenService.findOneid(req.user.sub) 
    await this.refreshtokenService.logout(refreshs);   
  }
}
