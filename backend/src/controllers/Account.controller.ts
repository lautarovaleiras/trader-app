import { Utils } from './../lib/Utils';
import { MonetaryAccount } from './../entities/MonetaryAccount';
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../entities/User'
import { AccountPostDTO, AccountPutDTO } from '../models/AccountPostDTO';
import { Validators } from '../lib/Validators';

export class AccountController {

    /**
     * 
     * @returns Retorna todas las cuentas en el sistema.
     */
    static async getAccounts(req: Request, res: Response): Promise<Response>{
        let accounts;
        try {
            accounts = await getRepository(MonetaryAccount).find();
        } catch (error) {
            return res.status(500).json({message:'internal_server_error', error});
        }

        if (accounts.length === 0)
            return res.status(404).json({message:'not_result'});

        return res.status(200).json(accounts);
    }
    
    /**
     * 
     * @param id id de la cuenta  
     * @returns retorna la cuenta del id recibido
     */
    static async getAccount(req: Request, res: Response): Promise<Response> {
        let id = req.params.id;

        if (!id) 
            return res.status(400).json({ message: "invalid_id" });


        let account;
        try {
            account = await getRepository(MonetaryAccount).findOne(id);
        } catch (error) {
            return res.status(500).json({message:'internal_server_error', error});
        }
        if (account===null || typeof account === 'undefined')
            return res.status(404).json({message: 'account_not_found'});
        return res.status(200).json(account);
    }

    /**
     * 
     * @param id de un usuario
     * @returns retorna todas las cuentas de dicho usuario
     */
    static  async getAccountsByUserId(req: Request, res: Response): Promise<Response> {
        let id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "invalid_id" });

        let account;
        try {
            account = await getRepository(MonetaryAccount).createQueryBuilder('account')
            .where("account.userId LIKE :userId ", {userId:id})
            .getMany()
        } catch (error) {
            return res.status(500).json({message:'internal_server_error', error});
        }
        if (account===null || typeof account === 'undefined')
            return res.status(404).json({message: 'account_not_found'});
        return res.status(200).json(account);
    }
    
    /**
     * 
     * @param AccountPostDTO recibe un tipo de moneda (type) eg. USD, ARS y un userId
     * Crea una cuenta y se lo asigna al usuario recibido
     * 
     * @returns retorna el id de la cuenta creada.
     */
    static async postAccount(req: Request, res: Response): Promise<Response>{
        let body :AccountPostDTO = req.body;
        let validData = Validators.ValidatePostAccountDTO(body);


        // Si la data es invalida corto el flujo de ejecucion
        if (validData.success === false) {
            return res.status(400).json({ message: validData.error });
        }
        
        let  result;
        try {
            result = await Utils.createUserAccount(body)
        } catch (error) {
            if (error.message === 'user_not_found')
                return  res.status(400).json({message: 'invalid_user'});
            if (error.message === 'account_for_user_already_exist')
                return res.status(400).json({message: 'account_for_user_already_exist'})
            return res.status(500).json({message:'internal_server_error', error});
        }
        return res.status(201).json({id: result});
    }

    /**
     * 
     * @param id id de lacuenta a actualiza
     * metodo para comprar divisas 
     * @returns cuanta actualizada
     */
    static async putAccount(req: Request, res:Response): Promise<Response>{
        let accout_id = req.params.id
        let validData = Validators.ValidatePutAccountDTO(req.body);

        // Si la data es invalida corto el flujo de ejecucion
        if (validData.success === false)
            return res.status(400).json({ message: validData.error });
        

        if(!accout_id)
            return res.status(400).json({ message: 'invalid_id'});


        const {type, amount, user_id} = req.body;

        let account: AccountPutDTO = {
            id: Number(req.params.id),
            type,
            amount,
            user_id            
        }

        let result:any;
        try {
            result = await Utils.editAccount(account);
        } catch (error) {
            console.log(error);
            if (error.message === 'bad_request')
                return res.status(400).json({message: 'bad_request'});
            if (error.message === 'account_not_found')
                return res.status(400).json({message: 'account_not_found'});
            if (error.message === 'insufficient_funds')
                return res.status(403).json({message: 'insufficient_funds'});
            return res.status(500).json({message:'internal_server_error'});
        }
        if (typeof result === 'undefined' ||  result === null)
            return res.status(500).json({message: 'internal_server_error'});



        return res.status(200).json(result);
    }

}
