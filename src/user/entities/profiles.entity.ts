import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn, OneToOne} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  name: number;

  @Column({ nullable: false})
  address: string;

  @Column({nullable: false })
  mobile : string;

  @Column({nullable: false })
  tel : string;

  @Column({ nullable: false})
  email: string;

  @Column({nullable: false})
  email_cc : string;

  @Column({ nullable: false})
  line_token: number;

  @OneToOne(()=>Users, (users)=>users.profiles)
  users: Users
}