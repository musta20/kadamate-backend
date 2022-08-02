import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Uploaded_files extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  File_name!: string;
  
  @Field()
  @Column()
  user_id!: number;

  @Field()
  @Column()
  Request_id!: number;

  @Field()
  @Column()
  ext!: string;
  
  @Field()
  @Column()
  is_public: boolean;

  
  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputServices {


    @Field()
    File_name!: string;
    
    @Field()
    user_id!: number;
  
    @Field()
    Request_id!: number;
  
    @Field()
    ext!: string;
    
    @Field()
    is_public: boolean;
  

}

