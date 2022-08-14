import { Field, ObjectType , InputType } from "type-graphql";
import { ObjectIdColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class RequirementUploaders extends BaseEntity {

  @Field()
  @ObjectIdColumn()
  _id!: string;

  @Field()
  @Column()
  Title_upload!: string;
  
  @Field()
  @Column()
  Service_id!: string;

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
    Title_upload!: string;
    
    @Field()
    Service_id!: string;
  
    @Field()
    is_required!: boolean;
  
}

