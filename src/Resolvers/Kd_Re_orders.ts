import {
  Resolver,
  Arg,
  Ctx,
  UseMiddleware,
  Mutation,
  Query,
} from "type-graphql";
import { apiContext } from "../utils/types";
import { inferToObjectId } from "../utils/types";

import { isAuth } from "../middleware/Auth/isAuth";
import { InputOrders } from "../modules/Kd_Mo_orders";
import { Orders } from "../modules/Kd_Mo_orders";
import {OrdersResponse } from "../utils/types"
import { Services } from "../modules/Kd_Mo_services";
import { Users } from "../modules/Kd_Mo_users";
@Resolver()
export class OrdersResolver {
  @UseMiddleware(isAuth)
  @Query(() =>[OrdersResponse])
  async AllOrder(@Ctx() { req }: apiContext) {
    const MyId = req.session?.passport.user.id;

    const responseOrderArray : OrdersResponse[] =[];

    const findOrders = await Orders.findBy({ User_id: MyId });

    findOrders.forEach(async _o=>{
      const serviceName  = await Services.findOneBy({_id:inferToObjectId(_o.Service_id)})
      const combany_name  = await Users.findOneBy({_id:inferToObjectId(_o.combany_id)})
      responseOrderArray.push({
      _id:  _o._id,

      Service_name: serviceName?.Title as string ,
      
      Request_des : _o.Request_des ,
    
      combany_name: combany_name?.name ,
    
      isDone: _o.isDone,
    
      done_msg: _o.done_msg,
      
      done_img: _o.done_img,
      
      is_viewed: _o.is_viewed,
    
      createdAt: _o.createdAt
     } )
    })
    return responseOrderArray;
  }

  @UseMiddleware(isAuth)
  @Query(() => [Orders])
  AllCompanyOrders(@Ctx() { req }: apiContext) {
    const MyId = req.session?.passport.user.id;

    return Orders.find({
      where: [{ User_id: inferToObjectId(MyId) }],
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => Orders)
  async getOrderByid(
    @Arg("OrderId") OrderId: string,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;

    const resultOrder = await Orders.findBy({
      User_id: MyId,
      _id: OrderId,
    }).catch((err) => {
      return { errors: [{ message: err }] };
    });

    if (!resultOrder) {
      return { errors: [{ message: "somthing went wrong" }] };
    }
    return resultOrder;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Orders)
  async addOrder(
    @Arg("orderInput") orderInput: InputOrders,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;
    orderInput.User_id = MyId;

    return await Orders.create(orderInput as Orders)
      .save()
      .catch((err) => {
        return { errors: [{ message: err }] };
      });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async CloseOrder(
    @Arg("OrderId") OrderId: string,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;
    const findImge = await Orders.findOneBy({ _id: inferToObjectId(OrderId) });

    if (!findImge) return false;

    if (findImge.User_id === MyId || findImge.combany_id === MyId) {
      findImge.isDone = 0;

      findImge.save();

      return true;
    }

    return false;
  }
}
