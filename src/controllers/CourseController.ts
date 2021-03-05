import {Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CourseRepository } from '../repository/CourseRepository';


class CourseController{
   async create (request: Request, response: Response){
   const {name, image} = request.body;

   const courseRepository = getCustomRepository(CourseRepository);

   const courseAlreadExists = await courseRepository.findOne({
     name
   })

   if(courseAlreadExists){
     return response.status(400).json({
       error: 'Course name already exists.'
     })
   }

   const course = courseRepository.create({
     name, image
   })

   await courseRepository.save(course)

   return response.status(201).json(course)

  }

  async list(request: Request, response: Response){
    const courseRepository = getCustomRepository(CourseRepository);

    const courses = await courseRepository.find();

    return response.json(courses)
  }

  async index(request: Request, response: Response){
    const {id} = request.params;

    const courseRepository = getCustomRepository(CourseRepository);

    const course = await courseRepository.findOne({
      id: id
    })

    return response.json(course)

  }

  async update(request: Request, response: Response){
    const {id} = request.params;
    const {name, image} = request.body;

    const courseRepository = getCustomRepository(CourseRepository);

     await courseRepository.update(id, {
      name, image
    })

    return response.send()

  }

  async delete(request: Request, response: Response){
    const {id} = request.params;

    try{
      const courseRepository = getCustomRepository(CourseRepository);

     await courseRepository.delete(id);

      return response.send()
    }catch(err){
      return response.status(400);
    }
  }
}

export {CourseController}