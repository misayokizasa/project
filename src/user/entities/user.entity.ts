import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert,OneToMany, BeforeUpdate, AfterLoad, OneToOne, JoinColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token_refreshs } from './token_refreshs.entity';
import { Roles } from './roles.entity';
import { Profiles } from './profiles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length:100 })
  firstname: string;

  @Column({ nullable: false, length:100  })
  lastname: string;

  @Column({ nullable: false})
  address: string;

  @Column({type: 'datetime'})
  birth_date: Date;

  @Column({ nullable: false, length:100  })
  email: string;

  @Column({ nullable: false, length:20  })
  phone: string;

  @Column({ nullable: false, length:50  })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  user_type: number;

  @Column({ nullable: false })
  companys_id: string;

  @OneToMany(() => Token_refreshs, (Refreshtoken) => Refreshtoken.users)
  refreshtoken: Token_refreshs[];

  @OneToOne(()=>Roles, (roles)=>roles.users)
  @JoinColumn()
  roles: Roles

  @OneToOne(()=>Profiles, (profiles)=>profiles.users)
  @JoinColumn()
  profiles: Profiles

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}