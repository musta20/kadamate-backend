import { Request , Response } from "express";
import { Field, ObjectType } from "type-graphql";

export type apiContext = {
  req: Request ;
  res: Response ;
};



declare module 'express-session' {
 interface Session {
    userId: number;
    passport: { user: { id: string, username: string } }
  }
}


export interface sessionUser { 
  id:number ,
   username:string
  }


export class ResponseResult {

  errors:[ErrorFiled] | null
  
}

@ObjectType()
 export class ErrorFiled {
  @Field()
  field:string;
  @Field()
  message:string;
}

