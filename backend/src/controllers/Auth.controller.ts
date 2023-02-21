import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import { User } from '../entities/User';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';

export class AuthController {
   
    /**
     * Metodo para inicio de sesion
     * @returns un mensaje 'ok' y el token (con los datos del user)
     */
    static async login(req: Request, res: Response): Promise<Response>{
        const {email,password} = req.body;
        
        if ( !(email && password) )
            return res.status(400).json({message: 'Email && Password are required!'});

        const userRepository = getRepository(User);

        let user: User;

        try {

            user = await userRepository.findOneOrFail({where:{email}});
        } catch (error) {
            return res.status(400).json({message:'Email or Password incorrect'});
        }

        // Checkear password
        if (!user.checkPassword(password))
            return res.status(400).json({message:'Email or Password incorrect'});

        const token = jwt.sign({userId: user.id, firstName: user.firstName, email:user.email},config.jwtSecret,{expiresIn:'1h'})

        return res.status(200).json({message: 'Ok', token});
    }
}

