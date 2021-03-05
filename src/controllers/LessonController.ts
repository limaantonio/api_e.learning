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
   const {name, duration, description,image, video_id} = request.body;

  let lesssonCourse = await courseRepository.findOne({
    where: {
      name: course,
      
    }
  })

  if(!lesssonCourse){
    lesssonCourse = courseRepository.create({
      name: course,
      image: image
     
    })
    await courseRepository.save(lesssonCourse)
  }

  const lesson =  lessonRepository.create({
    name, duration, description, course: lesssonCourse, video_id
  })

    await lessonRepository.save(lesson);

    return response.status(201).json(lesson)
    
  }

  async list(request: Request, response: Response){
    const lessonRepository = getCustomRepository(LessonRepository);

    const lessons = await lessonRepository.find();

    return response.json(lessons)
  } 

  async listByCourse(request: Request, response: Response){
    const {id} = request.params;

    const lessonRepository = getCustomRepository(LessonRepository);
   
    const courses = await lessonRepository.find({
      where: {course_id: id},
      
    });

    return response.json(courses)
  } 

  async update(request: Request, response: Response){
    const {id} = request.params;
    const { name, duration, description, image, course, video_id} = request.body;

    const lessonRepository = getCustomRepository(LessonRepository);
    const courseRepository = getCustomRepository(CourseRepository);

    let lesssonCourse = await courseRepository.findOne({
      where: {
        name: course,
      
      }
    })
  
    if(!lesssonCourse){
      lesssonCourse = courseRepository.create({
        name: course,
        image: image
      })
      await courseRepository.save(lesssonCourse)
    }
  
    const lesson =  lessonRepository.update(id, {
      name, duration, description, course: lesssonCourse, video_id
    })
    return response.send();

  }

  async delete(request: Request, response: Response){
    const {id} = request.params;
    
    const lessonRepository = getCustomRepository(LessonRepository);

     await lessonRepository.delete(id);

    return response.send()

  }
}

export {LessonController}