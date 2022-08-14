import { Categories } from "../modules/Kd_Mo_categories";

import { Resolver, Query, Arg } from "type-graphql";

@Resolver()
export class CategoriesResolver {
  @Query(() => [Categories])
  AllCategories() {
    return Categories.find();
  }

  @Query(() => Categories, { nullable: true })
  getCategoriesById(@Arg("id") _id: string) {
    return Categories.findOneBy({ _id });
  }
}
