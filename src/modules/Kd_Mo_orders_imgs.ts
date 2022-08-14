import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class OrderImg extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  user_id!: string;
  
  @Field()
  @Column()
  img_id!: string;

  @Field()
  @Column()
  Order_id!: string;
  
  @Field()
  @Column()
  combany_id!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputImgOrders {

    @Field()
    user_id!: string;
    
    @Field()
    img_id!: string;
  
    @Field()
    req_id!: string;
    
    @Field()
    combany_id!: string;
  
}

