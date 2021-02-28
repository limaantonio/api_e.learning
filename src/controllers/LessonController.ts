import { Request, Response } from "express";
import { getCustomRepository, getRepository, Repository } from "typeorm";
import { Course } from "../models/Course";
import { CourseRepository } from "../repository/CourseRepository";
import { LessonRepository } from "../repository/LessonRepository";


class LessonController{
  async create (request: Request, response: Response){
    const lessonRepository = getCustomRepository(LessonRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const {course} = request.body;
   const {name, duration, description} = request.body;

  let lesssonCourse = await courseRepository.findOne({
    where: {
      name: course
    }
  })

  if(!lesssonCourse){
    lesssonCourse = courseRepository.create({
      name: course,
      image: 'fdjf'

    })
    await courseRepository.save(lesssonCourse)
  }

  const lesson =  lessonRepository.create({
    name, duration, description, course: lesssonCourse,
  })

    await lessonRepository.save(lesson);

    return response.status(201).json(lesson)
    
  }

  async list(request: Request, response: Response){
    const lessonRepository = getCustomRepository(LessonRepository);

    const lessons = await lessonRepository.find();

    return response.json(lessons)
  } 

  
}

export {LessonController}