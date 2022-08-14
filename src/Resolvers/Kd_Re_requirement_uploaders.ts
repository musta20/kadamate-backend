import { isAuth } from "../middleware/Auth/isAuth";
import {
  InputRequirementUploaders,
  RequirementUploaders,
} from "../modules/Kd_Mo_requirement_uploaders";
import { apiContext } from "../utils/types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver()
export class RequirementUploadersResolver {
  @Query(() => [RequirementUploaders])
  async AllRequirementUploaders(@Arg("ServiceId") ServiceId: string) {
    await RequirementUploaders.findBy({ Service_id: ServiceId });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => RequirementUploaders)
  async AddRequirementUploaders(
    @Ctx() { req }: apiContext,
    @Arg("Ru") Ru: InputRequirementUploaders
  ) {
    const MyId = req.session?.passport.user.id;

    if (MyId) {
    const file=  await RequirementUploaders.create(Ru as RequirementUploaders).save().catch(err=>{
        console.log(err)
        return false
      });

      return file
    }
    return false

  }
}
