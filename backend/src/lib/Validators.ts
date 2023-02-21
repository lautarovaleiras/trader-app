import * as z from 'zod'; // Libreria que valida objetos y tipos primitivos de datos
import { User } from '../entities/User';
import { AccountPostDTO } from '../models/AccountPostDTO';
export class Validators{

    public static numberSchema  = z.number()

    public static ValidatePostAccountDTO (account: AccountPostDTO){
       const content=  z.object({
            type: z.string(),
            user_id: z.number(),
        })

        return content.safeParse(account);

    }

    public static ValidatePutAccountDTO (account: {type:string, amount:number, user_id:number}){
        const content=  z.object({
             type: z.string(),
             amount:z.number(),
             user_id: z.number(),
         })
 
         return content.safeParse(account);
 
    }

    public static ValidatePostUserBody(user:User){

        const content = z.object({
            firstName: z.string(),
            email: z.string(),
            lastName:z.string(),
            password: z.string()
        })

        return content.safeParse(user)
    }

}