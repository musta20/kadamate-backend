import { apiContext } from "../utils/types";

import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from "argon2";
//import { UsernameAndPassword, Users } from "src/modules/Kd_Mo_users";
import { InputUsers, Users } from "../modules/Kd_Mo_users";

@Resolver()
export class UserResolver {
  @Query(() => Users, { nullable: true })
  User(@Arg("id") _id: number) {
    //return em.findOne(User, { _id });
  }

  @Query(() => Users, { nullable: true })
  async Profile(@Ctx() { req }: apiContext) {
    console.log(req.session.passport.user.id)
    console.log(req.session.passport.user.username)
    if (!req.session.userId) return null;
    const usersend = await Users.findOneBy({ _id: req.session.userId });
    return usersend;
  }

  @Mutation(() => Users)
  async RegisterUser(
    @Arg("userInput") props: InputUsers,
    @Ctx() { req }: apiContext
  ) {

    const myId = req.session.userId;
    if(myId) return false
    if (props) {


      props.password =  await argon2.hash(props.password)

    const addUser=  await Users.create(props as Users)
        .save()
        .catch((err) => {
          console.log(err)
          return false;
        })
        return addUser;

    }

    return false

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

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") _id: number,
    @Arg("UserInput", () => InputUser) userInput: InputUser
  ) {
    const error = validateUser(userInput);
    if (error)
      return {
        errors: error,
      };

    const findUser = await User.findOneBy({ _id });

    if (!findUser)
      return {
        errors: {
          fied: "error",
        },
      };
    if (userInput.Adress) findUser.Adress = userInput.Adress;
    if (userInput.Contact) findUser.Contact = userInput.Contact;
    if (userInput.Name) findUser.Name = userInput.Name;

    return await User.save(findUser);
  } */
}
