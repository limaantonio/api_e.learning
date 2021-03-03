import {Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';

class UserController{
  async create(request: Request, response: Response){
    const {name, email, password} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = userRepository.create({
      name, email, password
    });

    await userRepository.save(user)

    return response.status(201).json(user)

  }

  async list(request: Request, response: Response){
    const userRepository = getCustomRepository(UserRepository);

    const courses = await userRepository.find();

    return response.json(courses)
  }
}

export {UserController}