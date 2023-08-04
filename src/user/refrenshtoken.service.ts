import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token_refreshs } from './entities/token_refreshs.entity';
import { UpdateRefrenshtokenDto } from './dto/update-refrenshtoken.dto';

@Injectable()
export class RefrenshtokenService {
  private currentDate: Date;
  constructor(
    @InjectRepository(Token_refreshs)
    private refreshtokenRepository: Repository<Token_refreshs>,
  ) { }

  async create(refreshtokendata : any) {
    const refreshtokenCreated = await this.refreshtokenRepository.save(refreshtokendata);
    return refreshtokenCreated
  }

  async findOne(refreshtoken:string) {
    return await this.refreshtokenRepository.findOne({ where: { refresh_token: refreshtoken } });
  }

  update(id: number, updateRefrenshtokenDto: UpdateRefrenshtokenDto) {
    return this.refreshtokenRepository.update(+id, updateRefrenshtokenDto);
  }

  async findOneid(refreshid:number) {
    return await this.refreshtokenRepository.find({ where: { user_id: refreshid,active:true } });
  }

  async logout(req:any){
    const date = this.currentDate = new Date() 
    const result = req.map((item) => {
      this.refreshtokenRepository.update(item.id,{active:false,updated:date});
    })
    return result;
  }
}
