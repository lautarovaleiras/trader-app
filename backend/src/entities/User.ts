import { MonetaryAccount } from './MonetaryAccount';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 255,
    nullable: true,
  })
  lastName: string;

  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    length: 255,
    nullable: false,
  })
  password: string;

  @OneToMany(() => MonetaryAccount, account => account.user)
    accounts: MonetaryAccount[];

  hashPassword() : void{
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt)
  }
  checkPassword(password: string):boolean{
    return bcrypt.compareSync(password,this.password)
    }
}

