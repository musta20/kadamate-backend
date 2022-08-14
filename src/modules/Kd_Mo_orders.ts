import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Orders extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id:  string;

  @Field()
  @Column()
  Service_id!: string;
  
  @Field()
  @Column()
  Request_des!: String;

  @Field()
  @Column()
  User_id!: string;
  
  @Field()
  @Column()
  combany_id!: string;

  @Field()
  @Column()
  isDone!: number;

  @Field()
  @Column()
  done_msg!: string;
  
  @Field()
  @Column()
  done_img!: string;
  

  @Field()
  @Column()
  is_viewed!: number;

  
  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputOrders {
    
    @Field()
    Service_id!: string;
    
    @Field()
    Request_des!: String;
  
    @Field()
    User_id!: string;
    
    @Field()
    combany_id!: string;
  
    @Field()
    isDone!: number;
  
    @Field()
    done_msg!: string;
    
    @Field()
    done_img!: string;
    
    @Field()
    is_viewed!: number;
}
