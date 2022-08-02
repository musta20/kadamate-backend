import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Users extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  name!: string;
  
  @Field()
  @Column()
  email!: number;

  @Field()
  @Column()
  des!: number;

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
  img_id: string;



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
  email!: number;

  @Field()
  des!: number;

  @Field()
  phone!: string;
  
  @Field()
  username: string;

  @Field()
  user_type: number;

  @Field()
  password: string;

  @Field()
  img_id: string;
  

}
