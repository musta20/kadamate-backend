import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Follows extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id!: string;

  @Field()
  @Column()
  combany_id!: string;
  
  @Field()
  @Column()
  User_id!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputFollows {

  @Field()
  Service_id!: string;

  @Field()
  User_id!: string  ;

}

