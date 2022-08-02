import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class OrderImg extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id!: number;

  @Field()
  @Column()
  user_id!: number;
  
  @Field()
  @Column()
  img_id!: number;

  @Field()
  @Column()
  Order_id!: number;
  
  @Field()
  @Column()
  combany_id!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputOrders {

    @Field()
    user_id!: number;
    
    @Field()
    img_id!: number;
  
    @Field()
    req_id!: number;
    
    @Field()
    combany_id!: number;
  
}

