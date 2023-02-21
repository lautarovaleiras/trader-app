export interface AccountPostDTO {

    type: string;
    user_id: number;
}

export interface AccountPutDTO extends  AccountPostDTO {
    id: number;
    amount: number;
}

