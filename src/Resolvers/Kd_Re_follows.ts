import { isAuth } from "../middleware/Auth/isAuth";
import { Follows } from "../modules/Kd_Mo_follows";
import { apiContext } from "../utils/types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class FollowsResolver {
    
  @Query(() => [Follows])
  AllFollows() {

    return Follows.find();
  }
  
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async Follows(
    @Ctx() { req }: apiContext,
    @Arg("CombanyId") CombanyId: string,
  ) {
  
  const MyId =  req.session?.passport?.user.id ;

  const isFollow = await Follows.findOneBy({User_id:MyId,combany_id:CombanyId})
   
   if(isFollow){
    Follows.delete(isFollow._id);
    return false
   }


    Follows.create({User_id:MyId,combany_id:CombanyId}).save()
    return true
   
  }
}