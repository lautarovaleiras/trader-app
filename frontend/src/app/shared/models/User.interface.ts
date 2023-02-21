export interface IUser{
  email:string;
  password:string;
}

export interface IUserResponse{
  message: string;
  token: string;
  userId:number;
}

export interface INewUser{

}
