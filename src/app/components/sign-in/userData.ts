import { Time } from "@angular/common";


export interface userData{
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    password:string;
    confirmPassword:string;
    gender:string;
    address:string;
    lastSeen:Date ;
    registeredDate:Date;
    status:string;

}
export interface usersdata{
    id:any,
    userName:string,
    email:string,
    phoneNumber:string,
    password:string,
    confirmPassword:string 
  }