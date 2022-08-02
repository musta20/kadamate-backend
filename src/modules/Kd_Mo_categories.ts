import { Field, InputType, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Categories extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Categories_Title!: string;

  @Field()
  @Column()
  Parent_Categories!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}




@InputType()
export class InputCategories {

  @Field()
  Categories_Title!: string;

  @Field()
  Parent_Categories!: number;


}

