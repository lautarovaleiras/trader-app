export interface INewAccount{
    type: string;
    user_id: number;
}

export interface IEditAccount{
    id?: number
    type:string,
    amount:number,
    user_id:number            
    
}