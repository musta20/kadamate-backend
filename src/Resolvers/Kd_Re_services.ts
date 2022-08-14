import { isAuth } from "../middleware/Auth/isAuth";

import { InputServices, Services } from "../modules/Kd_Mo_services";

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
export class ServicesResulver {
  @Query(() => [Services])
  async AllServices() {
    return Services.find();
  }

  @UseMiddleware(isAuth)
  @Query(() => [Services])
  async AllServicesMy(@Ctx() { req }: apiContext) {
    const MyId = req.session?.passport.user.id;

    return await Services.findBy({ user_id: MyId });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Services)
  async addServices(
    @Ctx() { req }: apiContext,
    @Arg("serviceIput") serviceId: InputServices
  ) {
    const MyId = req.session?.passport.user.id;
    serviceId.user_id = MyId;
   const sevedServ =  await Services.create(serviceId as Services)
      .save()
      .catch((err) => {
        console.log(err);
        return false;
      });

    return sevedServ;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Services)
  async updateServices(
    @Ctx() { req }: apiContext,
    @Arg("serviceIput") serviceIput: InputServices,
    @Arg("id") serviceId: string
  ) {
    const MyId = req.session?.passport.user.id;

    const serviceUpdate = await Services.findOneBy({
      _id: serviceId,
      user_id: MyId,
    });
    if (!serviceUpdate) {
      return false;
    }
    serviceUpdate.Title = serviceIput.Title;
    serviceUpdate.Description = serviceIput.Description;
    serviceUpdate.Requirement = serviceIput.Requirement;
    serviceUpdate.img_id = serviceIput.img_id;
    serviceUpdate.cat_id = serviceIput.cat_id;

    serviceUpdate.save().catch((err) => {
      console.error(err);

      return false;
    });

    return serviceUpdate;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteServices(
    @Ctx() { req }: apiContext,
    @Arg("serviceId") serviceId: string
  ) {
    const MyId = req.session?.passport.user.id;

    await Services.delete({ _id: serviceId, user_id: MyId }).catch((err) => {
      console.log(err);
      return false;
    });

    return true;
  }
}
