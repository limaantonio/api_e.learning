import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import {v4 as uuid } from 'uuid'
import { Course } from "./Course";

@Entity("lessons")
class Lesson{

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;
  
  @Column()
  duration:number;

  @Column()
  description: string;

  @Column()
  video_id: string;

  @Column()
  course_id : string;

  @ManyToOne(() => Course, course => course.lessson, {eager: true})
  @JoinColumn({name: "course_id"})
  course: Course

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }

}

export {Lesson}