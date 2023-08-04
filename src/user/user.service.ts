import { Injectable } from '@nestjs/common';
import { Users } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePassUsersDto } from './dto/changepass-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) { }

  async findOneWithUserName(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async findOneWithUserNames(username: string) {
    const data = await this.userRepository.count({where: {username: username}})
    if (data<1) {
      return {username:" "}      
    }
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async create(createUserDto: CreateUserDto) {
    const createQuery = await this.userRepository.createQueryBuilder("user")
    const data = await this.findOneWithUserNames(createUserDto.username)
      if(createUserDto.username==data.username){             
        return {"message":"Sorry, duplicate username"}
      }   
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const data = await this.userRepository.findOneBy({ id: id });
    return (data)
  }

  async changePass(changePassUsersDto: ChangePassUsersDto) {
    const user = await this.findOneWithUserName(changePassUsersDto.username);
    const saltOrRounds = 10;
    const password = changePassUsersDto.password_new;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const dataForUpdate: UpdateUserDto = {
      password: hash
    }
    return this.userRepository.update(user.id, dataForUpdate);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
