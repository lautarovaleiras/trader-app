import { AccountPutDTO } from './../models/AccountPostDTO';
import { MonetaryAccount } from './../entities/MonetaryAccount';
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { AccountPostDTO } from '../models/AccountPostDTO';
import { find, isEmpty } from 'lodash';
import * as ax from 'axios';
const axios = ax.default;
import * as querystring from 'querystring';


export class Utils {
    static cache: any;

   /**
    * 
    * @param account creo una cuenta(MonetaryAccount) y se lo asigno al usuario recibido
    * @returns id dela cuenta
    */
    static async createUserAccount(account: AccountPostDTO) {
        let user;
        let result;
        try {
            // busco el usuario con el id que recibo y si no lo oencuentra retorn error.
            user = await this.getUserById(account.user_id);
        } catch (error) {
            throw error;
        }

        if (user === null)
            throw new Error('user_not_found');
        


        const newAccount = new MonetaryAccount();
        newAccount.type = account.type;
        //Monto Default al crear una nueva cuenta  es 0
        newAccount.amount = 0;
        newAccount.user  = user
        
        
        try {
            result = await this.createAccount(newAccount)
        } catch (error) {
            throw error;
        }
        
        return result.id;

    }

    static async getUserById(user_id:number): Promise<User | null>{
        return  await getRepository(User).findOne(user_id) || null;
    }

    /**
     * 
     * @param new_account chequea que el usuario no tenga una cuenta de ese tipo,
     * y la crea
     * @returns retorna la cuenta creada
     */
    static async createAccount(new_account: MonetaryAccount): Promise<MonetaryAccount>{
        const accountRepository = getRepository(MonetaryAccount);
        // traigo todos las cuentas del usaurio recibido.
        let user_accounts: MonetaryAccount[] = await accountRepository.createQueryBuilder('userAccount')
            .leftJoinAndSelect("userAccount.user", "user")
            .where("user.id LIKE :userId", {userId:new_account.user.id})
            .getMany();

        // Checkea si el usuario ya tiene una cuenta de ese type eg. EUR,AR,EU
        if (find(user_accounts,{type:new_account.type}))
            throw new Error('account_for_user_already_exist');

        return await accountRepository.save(new_account);
    }
    /**
     * este metodo contempla la compra de divisas y deposito de pesos
     * @param account recibo la cuenta con la que quiero comprar divisas, 
     * la divisa que quiero comprar 
     * y el monto que quiero comprar.
     * eg.:
     * ARS, USD, 1000 -> compra
     * ARS,ARS,1000 -> deposito
     * USD,ARS, 1000 -> vender
     * @returns retorna la cuenta actualizada
     * 
     */
    static async editAccount(account:AccountPutDTO){
        const accountRepository = getRepository(MonetaryAccount);
        // Busco la cuenta con la quiero comprar divisas.
        let user_account = await accountRepository.findOne(account.id);

        if (typeof user_account === 'undefined')
            return new Error('account_not_found');

        // cuando se quiere depositar pesos
        if (account.type === 'ARS' && user_account.type === 'ARS'){
            user_account.amount += account.amount;
            return await accountRepository.save(user_account);
        }

        // Busco la cuenta Destino de la nueva divisa.
        let dst_account = await accountRepository.createQueryBuilder('account')
            .where("account.type LIKE :type AND account.userId LIKE :userId ", {type:account.type, userId:account.user_id})
            .getOne();

        
        if (typeof dst_account === 'undefined')
            return new Error('account_not_found');

        // Calculo cuanto vale la moneda que quiero comprar con la cuenta que quiero comprar
        let currency_value = await this.convertAmount(dst_account.type,user_account.type);
        
        let amount_to_buy = currency_value * account.amount;
        
          
        if(user_account.type === dst_account.type)
            throw new Error('bad_request');

        // console.log(user_account);
        // console.log(dst_account);
        // console.log(account.amount);
        // console.log(amount_to_buy); 

        // Si el costo del monto que quiero comprar, es mayor al disponible en la cuenta con la quiero comptrar retorno error.
        if(amount_to_buy > user_account.amount)
            throw new Error('insufficient_funds');
             
        user_account.amount -= amount_to_buy;
        dst_account.amount += account.amount;

        try {
            await accountRepository.update({id:user_account.id},user_account);
        } catch (error) {
            throw error;
        }
        
        return await accountRepository.save(dst_account);
    }


    /**
     * 
     * @param from Divisa origen
     * @param to Divisa destino
     * @returns costo de la divisa a comprar en base a la moneda con la que se quiere comprar
     */
    static async convertAmount(from: string = 'ARS', to: string){
        let rates: any;

        // Para no excecer el limite de request, hace solo el primer req y el resultado lo guarda en memoria.
        if(isEmpty(this.cache)){
            console.log('pegada a fixer')
            this.cache = await this.getRatesFromFixer();
        }
        // posible caso de uso, si la app esta deployada, hacer el request 1 vez por dia.
        if(this.cache.date < new Date())
            console.log('fecha vencida')
            this.cache = await this.getRatesFromFixer();
        
        let fixer_data = this.cache;

        rates = fixer_data.rates;
            

        return rates[to] / rates[from];
    }
    /**
     * Cuenta free retorna por defualt la moneda en base a Euros
     *  Tiene un limite de 500 request por mes.
     */
    static async getRatesFromFixer(): Promise<any>{
       
        return new Promise((resolve, reject) => {
            // Cuentra Free (500 request x mes)
            let access_key = 'bb9fd8773b95d9922c032d06e85a781e'
            axios
                .get(
                    `http://data.fixer.io/api/latest?access_key=${access_key}`)
                    .then(function (res) {
                        if (res.status == 200) 
                            resolve(res.data);
                        else
                            throw new Error('Error getting tokens');
                    })
                    .catch(function (res) {
                        console.log(res);
                        reject(res);
                });
        });
    
    }
}