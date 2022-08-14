import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Messages extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id!: string;

  @Field()
  @Column()
  Sender_id!: string;
  
  @Field()
  @Column()
  Messages!: String;

  @Field()
  @Column()
  User_id!: string;
  
  @Field()
  @Column()
  Order_id!: string;

  @Field()
  @Column()
  isDone!: number;

  @Field()
  @Column()
  m_type!: number;


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
export class InputMessages {
    @Field()
    Sender_id!: string;
    
    @Field()
    Messages!: String;
  
    @Field()
    User_id!: string;
    
    @Field()
    Order_id!: string;
  
    @Field()
    isDone!: number;
  
    @Field()
    m_type!: number;
  
  
    @Field()
    is_viewed!: number;
  
}

