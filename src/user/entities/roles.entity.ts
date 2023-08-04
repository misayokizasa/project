import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  name: number;

  @Column({ nullable: false})
  code: string;

  @Column({nullable: false})
  permission_code : string;
}