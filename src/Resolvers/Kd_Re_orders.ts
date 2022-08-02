import {
  Resolver,
  Arg,
  Ctx,
  UseMiddleware,
  Mutation,
  Query,
} from "type-graphql";
import { apiContext } from "../utils/types";

import { isAuth } from "../middleware/Auth/isAuth";
import { InputOrders, OrderImg } from "../modules/Kd_Mo_orders_imgs";
import { Orders } from "../modules/Kd_Mo_orders";

@Resolver()
export class OrdersResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Orders])
  AllOrder(@Ctx() { req }: apiContext) {
    const MyId = req.session?.userId;

    return Orders.find({
      where: [{ User_id: MyId }],
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => Orders)
  async getOrderByid(
    @Arg("OrderId") OrderId: number,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.userId;

    const resultOrder = await Orders.findBy({
      User_id: MyId,
      _id: OrderId,
    }).catch((err) => {
      return err;
    });

    if (!resultOrder) {
      return false;
    }
    return resultOrder;
  }

  @UseMiddleware(isAuth)
  @Query(() => OrderImg)
  async addOrder(
    @Arg("orderInput") orderInput: InputOrders,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.userId;
    orderInput.req_id = MyId;

    return await OrderImg.create(orderInput)
      .save()
      .catch((err) => {
        return err;
      });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async CloseOrder(
    @Arg("OrderId") OrderId: number,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.userId;

    const findImge = await Orders.findOne({
      where: [
        { combany_id: MyId, _id: OrderId },
        { User_id: MyId, _id: OrderId },
      ],
    });

    if (findImge) {
      findImge.isDone = true;
      findImge.save()
    }

    return false;
  }
}
