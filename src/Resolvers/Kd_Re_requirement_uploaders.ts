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
  async AllRequirementUploaders(@Arg("ServiceId") ServiceId: number) {
    await RequirementUploaders.findBy({ Service_id: ServiceId });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => RequirementUploaders)
  async AddRequirementUploaders(
    @Ctx() { req }: apiContext,
    @Arg("Ru") Ru: InputRequirementUploaders
  ) {
    const MyId = parseInt(req.session?.passport.user.id);

    if (MyId) {
      await RequirementUploaders.create(Ru as RequirementUploaders);
    }
  }
}
