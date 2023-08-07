import { Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: number;

  @Column({ nullable: false})
  code: string;

  @Column({nullable: false})
  permission_code : number;

  @OneToOne(()=>Users,(users)=>users.roles)
  users: Users
}