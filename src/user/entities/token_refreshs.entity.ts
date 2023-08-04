import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Token_refreshs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime'})
  created: Date;

  @Column({type: 'datetime'})
  updated: Date;
  
  @Column()
  active: boolean;

  @Column({ nullable: false})
  active_sum: number;

  @Column({ nullable: false})
  refresh_token: string;

  @Column( { type: 'time' })
  ttl: Date;

  @Column({ nullable: false})
  user_id: number;

  @ManyToOne(()=> Users, (users)=> users.refreshtoken)
  @JoinColumn({name: 'user_id',referencedColumnName:'id'})
  users: Users
}