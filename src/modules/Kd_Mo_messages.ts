import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Messages extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Sender_id!: number;
  
  @Field()
  @Column()
  Messages!: String;

  @Field()
  @Column()
  User_id!: number;
  
  @Field()
  @Column()
  Order_id!: number;

  @Field()
  @Column()
  isDone!: boolean;

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
    Sender_id!: number;
    
    @Field()
    Messages!: String;
  
    @Field()
    User_id!: number;
    
    @Field()
    Order_id!: number;
  
    @Field()
    isDone!: boolean;
  
    @Field()
    m_type!: number;
  
  
    @Field()
    is_viewed!: number;
  
}

