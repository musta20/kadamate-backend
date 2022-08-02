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
  Service_id!: number;
  
  @Field()
  @Column()
  Request_des!: String;

  @Field()
  @Column()
  User_id!: number;
  
  @Field()
  @Column()
  combany_id!: number;

  @Field()
  @Column()
  isDone!: boolean;

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
export class InputMessages {
    
    @Field()
    Service_id!: number;
    
    @Field()
    Request_des!: String;
  
    @Field()
    User_id!: number;
    
    @Field()
    combany_id!: number;
  
    @Field()
    isDone!: boolean;
  
    @Field()
    done_msg!: string;
    
    @Field()
    done_img!: string;
    
    @Field()
    is_viewed!: number;
}

