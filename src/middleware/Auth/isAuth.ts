import { MiddlewareFn } from "type-graphql";
import { apiContext } from "../../utils/types";

export const isAuth: MiddlewareFn<apiContext> = ({ context }, next) => {
  if (!context.req.isAuthenticated()) {
    throw new Error("not authenticated");
  }

  return next();
};