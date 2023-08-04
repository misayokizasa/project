import { 
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthguard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { ChangePassUsersDto } from 'src/user/dto/changepass-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthguard)
  @Post('login')
  signin(@Body() data: CreateUserDto) {
    return this.authService.signin(data);
  }
  
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto){
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Request() req) {
    this.authService.logout(req);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken      
    return this.authService.refreshTokens(userId,refreshToken,req);
  }
  
  @Patch('changepass')
  changePass(@Body() changePassUsersDto: ChangePassUsersDto){
    return this.userService.changePass(changePassUsersDto);
  }
}
