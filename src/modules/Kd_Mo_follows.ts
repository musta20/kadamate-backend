import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Follows extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Service_id!: number;
  
  @Field()
  @Column()
  User_id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputFollows {

  @Field()
  Service_id!: number;

  @Field()
  User_id!: number  ;

}

