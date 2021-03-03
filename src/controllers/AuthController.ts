import { Request, request, Response, response } from "express"
import jwt from 'jsonwebtoken'
import { getCustomRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repository/UserRepository";
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import SendMailService from "../services/SendMailService";
import {resolve} from 'path'

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

class AuthController{
  async register (request: Request, response: Response){
    const { email} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const emailAlreadyExists = await userRepository.findOne({email})

    try{
      if(emailAlreadyExists){
        return response.status(400).send({error: 'User already exists'})
      }
     const user = userRepository.create(request.body)
     
     await userRepository.save(user)

     user.password = undefined;

      return response.send({
        user,
        token: generateToken({id: user.id})
      })
    }catch(err){
      return response.status(400).send({error: 'Registration failed'})
    }
  }

  async authenticate(request: Request, response: Response){
    const {email, password} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    let user = new User();

     user = await userRepository.findOne({select: ["password"], where: {email: email}})
    
    if(!user) {
      return response.status(400).send({error: 'User not found'})
    }

    if(password !== user.password){
      return response.status(400).send({error: 'Invalid password'})
     }

     user.password = undefined;

     response.send({
       user: user,
       token: generateToken({id: user.id})
     })
  }

  async forgot_password(request: Request, response: Response){
    const {email} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    try{
      const user = await userRepository.findOne({email});
      console.log(user)

      if(!user)
        response.status(400).send({erro: 'User not found'})

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        console.log(now)

        await userRepository.update(user.id, {
          passwordResetToken: token,
          passwordResetExpires: now,

        })

        const dadosMail = {
          name: user.name,
          token: token
        }

        const path = resolve(__dirname, "..", "view", "emails", "forgotPassword.hbs");

        await SendMailService.execute(email, 'Recuperação de senha', dadosMail, path)
       return response.status(200).json({token: token});       
      
    }catch(err){
      console.log(err)
      return  response.status(400).send({error: 'Erro on forgot password, try again'});
    }
  }

  async reset_password(request: Request, response: Response){
    const {email, token, password} = request.body;

    const userRepository = getCustomRepository(UserRepository);

    let user = new User();


    try{
       user = await userRepository.findOne(
        {select: ["passwordResetToken", "passwordResetExpires"], where: {email: email}
      })

      const id = await userRepository.findOne(
        { where: {email: email}
      })

      console.log(user.name)

      if(!user){
        return response.status(400).send({error: 'User not found'})
      }
      if(token !== user.passwordResetToken)
        return response.status(400).send({erros: 'Token invalid.'});

      const now = new Date();

      if(now > user.passwordResetExpires)
        return response.status(400).send({erros: 'Token expired.'})

    user.password = password;   

      await userRepository.update(user.id, 
       {password: password}
      );

      console.log(user)

      return response.send(user);
    }catch(err){
      console.log(err)
      return response.send({erro: 'Cannot reset password, try again.'})
    }
  }
}

export {AuthController}