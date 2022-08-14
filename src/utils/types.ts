import { Request , Response } from "express";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

export type apiContext = {
  req: Request ;
  res: Response ;
};

export const inferToObjectId = (strId:string)=>{
  return new ObjectId(strId) as any
}

declare module 'express-session' {
 interface Session {
    userId: string;
    passport: { user: { id: string, username: string } }
  }
}

@ObjectType()
export class OrdersResponse {
  @Field()
  _id:  string;
  
  @Field()
  Service_name: string | undefined;
  @Field()
  Request_des : String;
  @Field()
  combany_name: string | undefined;
  @Field()
  isDone: number;
  @Field()
  done_msg: string;
  @Field()
  done_img: string;
  @Field()
  is_viewed: number;
  @Field()
  createdAt: Date;

}

export interface sessionUser { 
  id:string ,
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

