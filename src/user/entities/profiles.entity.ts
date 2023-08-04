import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  name: number;

  @Column({ nullable: false})
  address: string;

  @Column({nullable: false})
  mobile : string;

  @Column({ nullable: false})
  email: string;

  @Column({nullable: false})
  email_cc : string;

  @Column({ nullable: false})
  user_id: number;
}