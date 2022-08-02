import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Users extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id!: number;

  @Field()
  @Column()
  name!: string;
  
  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  des!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  access_token!: string;
  
  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  user_type: number;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  img_id: number;



  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputUsers {


  @Field()
  name!: string;
  
  @Field()
  email!: string;

  @Field()
  des!: string;

  @Field()
  phone!: string;
  
  @Field()
  username: string;

  @Field()
  user_type: number;

  @Field()
  password: string;

  @Field()
  img_id: number;
  

}

@InputType()
export class UsernameAndPassword {
  

  
  @Field()
  username: string;

  @Field()
  password: string;



}


