import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert,OneToMany, BeforeUpdate, AfterLoad} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token_refreshs } from './token_refreshs.entity';

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

  @Column({ nullable: false, length:100  })
  email: string;

  @Column({ nullable: false, length:20  })
  phone: string;

  @Column({ nullable: false, length:50  })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false })
  companys_id: string;

  @OneToMany(() => Token_refreshs, (Refreshtoken) => Refreshtoken.users)
  refreshtoken: Token_refreshs[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}