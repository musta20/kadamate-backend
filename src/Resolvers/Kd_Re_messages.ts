import {
  Resolver,
  Query,
  Arg,
  Ctx,
  UseMiddleware,
  Mutation,
} from "type-graphql";
import { apiContext } from "../utils/types";

import { isAuth } from "../middleware/Auth/isAuth";
import { Messages , InputMessages } from "../modules/Kd_Mo_messages";

@Resolver()
export class MessagesResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Messages])
  AllMessages(@Ctx() { req }: apiContext) {
    const MyId = req.session?.passport.user.id;

    return Messages.find({ where: [{ User_id: MyId }, { Sender_id: MyId }] });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => [Messages])
  AllMessagesByOrderId(
    @Arg("OrderId") OrderId: string,
    @Ctx() { req }: apiContext
  ) {
   
    const MyId = req.session?.passport.user.id;

    return Messages.find({
      where: [{ User_id: MyId }, { Sender_id: MyId }, { Order_id: OrderId }],
    });
  }


  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async SendMessages(
    @Arg("messageInput") messageInput: InputMessages,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport.user.id;

    messageInput.Sender_id = MyId;

    await Messages.create(messageInput as Messages)
      .save()
      .catch((err) => {
        console.log(err);
        return false;
      });

    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async DeleteMessages(
    @Arg("messageID") messageID: string,
    @Ctx() { req }: apiContext
  ) {
    const MyId =req.session?.passport.user.id;

    await Messages.delete({ _id: messageID, Sender_id: MyId }).catch((err) => {
      console.error(err)
      return false;
    });

    return true;
  }
}
