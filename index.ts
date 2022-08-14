import "reflect-metadata";

import databaseConfig from "././src/dataBase/MoConfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import cors from "cors";
import { DataSource } from "typeorm";
import config from "./config";

import session from "express-session";

import MongoStore from "connect-mongo";
import { Passport, router } from "./src/middleware/Auth/Auth";
import { CategoriesResolver } from "./src/Resolvers/Kd_Re_categories";
import { FollowsResolver } from "./src/Resolvers/Kd_Re_follows";
import { MessagesResolver } from "./src/Resolvers/Kd_Re_messages";
import { OrderImgResolver } from "./src/Resolvers/Kd_Re_orders_imgs";
import { OrdersResolver } from "./src/Resolvers/Kd_Re_orders";
import { RequirementUploadersResolver } from "./src/Resolvers/Kd_Re_requirement_uploaders";
import { UploadedFilesResulver } from "./src/Resolvers/Kd_Re_uploaded_files";
import { UserResolver } from "./src/Resolvers/Kd_Re_users";
import { __prod__ } from "./constants";
import { ServicesResulver } from "./src/Resolvers/Kd_Re_services";

const main = async () => {
  const PORT = config.SERVER_PORT;
  const typeOrmConnection = await new DataSource(databaseConfig);
  typeOrmConnection
    .initialize()
    .then(() => {
      console.log("\x1b[32m%s\x1b[0m", `Data Source has been initialized!`);
    })
    .catch((err) => {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Error during Data Source initialization",
        err
      );
    });

  const app = express();
  app.use(
    session({
      name: "billtoken",
      store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/session",
      }),
      cookie: {
        maxAge: 315360000000,
        httpOnly: false,
        secure: false,
      },
      saveUninitialized: false,
      secret: "keyboardcat",
      resave: false,})
    
  );
/*   store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/session",
  }), */
  app.use(Passport.authenticate("session",{ session: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      credentials: true,
      origin: __prod__ ?   config.APOLLO_URL : config.BACK_END_URL  ,
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
    })
  );

  /* ini passport */
  app.use(router);
  // Set up session
  ///////////   apolloServer   //////////////
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        FollowsResolver,
        CategoriesResolver,
        MessagesResolver,
        OrderImgResolver,
        OrdersResolver,
        RequirementUploadersResolver,
        UploadedFilesResulver,
        UserResolver,
        ServicesResulver,
      ],
    }),
    context: ({ req, res }) => ({ req, res, typeOrmConnection }),
  });

  await apolloServer.start();
//, cors: false 
  apolloServer.applyMiddleware({ app ,cors:false });

  ///////////express Middleware //////////////
  app.get("/", (_req, res) => {
    res.send("BACK END URL IS http://localhost:3000");
  });

  app.listen(PORT, () => {
    console.log("\x1b[33m%s\x1b[0m", `NODEJS SERVER RUNNING ON PORT:${PORT}`);
  });
};

main().catch((err) => console.log(err));
