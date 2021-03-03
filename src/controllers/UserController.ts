import {Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';

class UserController{
  async list(request: Request, response: Response){
    const userRepository = getCustomRepository(UserRepository);

    const courses = await userRepository.find();

    return response.json(courses)
  }
}

export {UserController}