import { Request , Response } from "express";
import { Field, ObjectType } from "type-graphql";

export type apiContext = {
  req: Request ;
  res: Response ;
};



declare module 'express-session' {
 interface Session {
    userId: number;
  }
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

