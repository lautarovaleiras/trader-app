import { MonetaryAccount } from './../entities/MonetaryAccount';
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../entities/User'
import { Validators } from '../lib/Validators';

export class UserController {
   /**
    * 
    * @returns Retorna todos los usuarios
    */
    static async getUsers(req: Request, res: Response): Promise<Response>{

        let users;
        try {
            users = await getRepository(User).find();
        } catch (error) {
            return res.status(500).json({message:'internal_server_error', error});
        }

        if (users.length === 0)
            return res.status(404).json({message:'not_result'});

        return res.status(200).json(users);
    }
    /**
     * @param id id de usuario
     * @returns Retorna un usuario por id.
     */
    static async getUser(req: Request, res: Response): Promise<Response> {
        let id = req.params.id;
        if(!id)
            return res.status(400).json({message:'invalid_token'});
        let user;
        try {
            user = await getRepository(User).findOne(id);
        } catch (error) {
            return res.status(500).json({message:'internal_server_error', error});
        }
        if (user===null || typeof user === 'undefined')
            return res.status(404).json({message: 'user_not_found'});
        return res.status(200).json(user);
    }
    
    /**
     * Da de alta un usuario, y una cuenta en pesos 'ARS' y se lo asigna.
     * @returns retorna el usuario creado
     */
    static async postUser(req: Request, res: Response): Promise<Response>{
        let req_user: User = req.body;

        let validData = Validators.ValidatePostUserBody(req.body);

        // Si la data es invalida corto el flujo de ejecucion
        if (validData.success === false)
            return res.status(400).json({ message: validData.error });
        
        const user = new User();
        
        user.firstName = req_user.firstName
        user.lastName = req_user.lastName
        user.email = req_user.email
        user.password = req_user.password

        const accountRepository = getRepository(MonetaryAccount)
        
        // Por default se le crea una cuenta en pesos
        const account = new MonetaryAccount();
        account.type = 'ARS';
        account.amount = 0;
        try {
            await accountRepository.save(account);
        } catch (error) {
            return res.status(500).json({message:'internal_server_error'})
        }
        user.accounts = [account];

        let  result;
        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            result = await userRepository.save(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:'internal_server_error', error});
        }
        // NO envío la pws
        const {password, ...data} = result
        return res.status(201).json(data);
    }

}

