import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Requirement_uploaders extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Title_upload!: string;
  
  @Field()
  @Column()
  Service_id!: number;

  @Field()
  @Column()
  is_required!: boolean;
  
  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputRequirementUploaders {
    @Field()
    @PrimaryGeneratedColumn()
    _id!: number;
  
    @Field()
    @Column()
    Title_upload!: string;
    
    @Field()
    @Column()
    Service_id!: number;
  
    @Field()
    @Column()
    is_required!: boolean;
  
}

