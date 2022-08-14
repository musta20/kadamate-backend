import { Resolver, Arg, Ctx, UseMiddleware, Mutation, Query } from "type-graphql";
import { apiContext } from "../utils/types";

import { isAuth } from "../middleware/Auth/isAuth";
import { InputImgOrders, OrderImg } from "../modules/Kd_Mo_orders_imgs";

@Resolver()
export class OrderImgResolver {

  @UseMiddleware(isAuth)
  @Query(() => [OrderImg])
  getAllOrderImgByOrderId(
    @Arg("OrderId") OrderId: string,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;

    return OrderImg.find({
      where: [{ user_id: MyId }, { Order_id: OrderId }],
    });
  }


  @UseMiddleware(isAuth)
  @Query(() => [OrderImg])
  getAllOrderImgByAndCompanyOrderId(
    @Arg("OrderId") OrderId: string,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;

    return OrderImg.find({
      where: [{ Order_id: OrderId }, { combany_id: MyId }],
    });
  }


  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteOrderImg(
    @Arg("imgId") imgId: string,
    @Ctx() { req }: apiContext
  ) {

    const MyId = req.session?.passport.user.id;

    const findImge = await OrderImg.findOneBy({ user_id: MyId, img_id: imgId });

    if (findImge) {

      OrderImg.delete(findImge?._id);

      return true;

    }else{

      return false;

    }

  }



  @UseMiddleware(isAuth)
  @Mutation(() => OrderImg)
  async addOrderImg(
    @Arg("imgInput") imgId: InputImgOrders,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;

    imgId.user_id = MyId;
    
    const imge = await OrderImg.create(imgId)
      .save()
      .catch((err) => {
        return err;
      });

    return imge;
  }






}
