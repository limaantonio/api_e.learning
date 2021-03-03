import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import SendMailService from "../services/SendMailService";
import {resolve} from 'path'

class SendMailController{
  async execute(request: Request, response: Response){
    const {email} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const o = {
      title: 'Teste menssagem',
     
    }

    const path = resolve(__dirname, "..", "view", "emails", "npsMail.hbs");

    await SendMailService.execute(email, 'title', o, path );

    return response.send();

  }
}

export {SendMailController}