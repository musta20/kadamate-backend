import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Services extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Title!: string;
  
  @Field()
  @Column()
  Description!: string;

  @Field()
  @Column()
  Requirement!: string;

  @Field()
  @Column()
  NumberOf_Request_Done	!: number;


  @Field()
  @Column()
  user_id!: number;



  @Field()
  @Column()
  is_des_req!: number;


  @Field()
  @Column()
  img_id!: number;

  @Field()
  @Column()
  cat_id!: number;


  
  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputServices {


  @Field()
  Title!: string;
  
  @Field()
  Description!: string;

  @Field()
  Requirement!: string;

  @Field()
  NumberOf_Request_Done	!: number;

  @Field()
  user_id!: number;

  @Field()
  is_des_req!: number;


  @Field()
  img_id!: number;

  @Field()
  cat_id!: number;


}

