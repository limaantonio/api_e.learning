import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { Lesson } from './Lesson';

@Entity("courses")
class Course{

  @PrimaryColumn()
  readonly id: string;
  
  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessson: Lesson

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuid()
     
    }
  }
}

export {Course};