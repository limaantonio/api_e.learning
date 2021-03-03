import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

import {Exclude} from 'class-transformer'


@Entity('users')
class User{

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  
  @Column({ select: false })
  password: string;

  @Column({ select: false })
  passwordResetToken: string

  @Column({ select: false })
  passwordResetExpires: Date

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export {User}