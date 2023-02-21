import { Entity, PrimaryGeneratedColumn, Column, Generated, Unique, ManyToOne, JoinColumn } from "typeorm";
import bcrypt from 'bcryptjs';
import { User } from "./User";

@Entity()
export class MonetaryAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    nullable: false,

  })
  type: string;

  @Column({
    nullable: false,
  })
  amount: number;

  @Column({ nullable: true })
    userId: number;

  @ManyToOne(() => User, user => user.accounts)
  @JoinColumn()
  user: User;


  
}

