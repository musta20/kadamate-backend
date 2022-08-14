import { apiContext, inferToObjectId } from "../utils/types";

import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from "argon2";
//import { UsernameAndPassword, Users } from "src/modules/Kd_Mo_users";
import { InputUsers, InputUsersCustmer, Users } from "../modules/Kd_Mo_users";

@Resolver()
export class UserResolver {
  @Query(() => Users, { nullable: true })
  User(@Arg("id") _id: string) {
    //return em.findOne(User, { _id });
  }

  @Query(() => Users, { nullable: true })
  async Profile(@Ctx() { req }: apiContext) { 
    const MyId = req.session?.passport?.user?.id;
   
    if (!MyId) return null;
    const usersend = await Users.findOneBy({ _id:inferToObjectId( MyId )});

    return usersend;
  }

  @Mutation(() => Users)
  async RegisterUser(
    @Arg("userInput") props: InputUsers,
    @Ctx() { req }: apiContext
  ) {
    const MyId = req.session?.passport?.user.id;

    if (MyId) return false;
    if (props) {
      props.password = await argon2.hash(props.password);

      const addUser = await Users.create(props as Users)
        .save()
        .catch((err) => {
          console.log(err);
          return { errors: [{ field: "error", message: err }] };
        });

      return addUser;
    }

    return {
      errors: [{ field: "error", message: "spmthing went wrong" }],
    };
  }

  /*  @Mutation(() => Users)
  async loginUser(
    @Arg("userNameAndPassword") props: UsernameAndPassword,
    @Ctx() { req }: apiContext
  ) {
     */
  /* 
    const error = validateUserLogin(props);
    if (error)
      return {
        errors: error,
      };
    const userFind = await User.findOne({ where: { email: props.email } });
    //await em.findOne(User, { email : props.email  })

    if (!userFind)
      return {
        errors: [{ field: "email", message: "incorrect email " }],
      };

    const isValid = await argon2.verify(userFind.Password, props.Password);

    if (!isValid)
      return {
        errors: [{ field: "password", message: "incorrect email or password" }],
      };

    req.session.userId = userFind._id;

    return {
      user: userFind,
    }; */
  //}
  /* 
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: apiContext) {
    res.clearCookie("billtoken");

    return new Promise((resulv) =>
      req.session.destroy((err) => {
        if (err) return resulv(false);
        return resulv(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Arg("UserInput", () => InputUser) userInput: InputUser,
    @Ctx() { req }: apiContext
  ) {
    const error = validateUser(userInput);
    console.log("erro no excet");

    console.log(error);
    if (error) return { errors: error };

    userInput.Password = await argon2.hash(userInput.Password);

    const returnuser = await User.create(userInput as User).save();

    req.session.userId = returnuser._id;
    return {
      user: returnuser,
    };
  }
*/
  @Mutation(() => Users, { nullable: true })
  async updateUser(
    @Arg("UserInput", () => InputUsersCustmer) userInput: InputUsersCustmer,
    @Ctx() { req }: apiContext
  ) {
   // const error = validateUser(userInput);
 /*    if (error)
      return {
        errors: error,
      }; */
      const MyId = req.session?.passport?.user?.id;
   
      if (!MyId) return null;
    const findUser = await Users.findOneBy({ _id:inferToObjectId(MyId) });

    if (!findUser)
      return {
        errors: {
          fied: "error",
        },
      };
    if (userInput.email) findUser.email = userInput.email;
    if (userInput.name) findUser.name = userInput.name;
    if (userInput.phone) findUser.phone = userInput.phone;

    return await Users.save(findUser);
  } 
}
