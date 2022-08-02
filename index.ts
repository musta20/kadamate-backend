import "reflect-metadata";

import databaseConfig from "./src/dataBase/MoConfig";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import cors from "cors";
import { DataSource } from "typeorm";
import config from "config";

import session from "express-session";
import MongoStore from 'connect-mongo'
import passport from "passport";
import { CategoriesResolver } from "src/Resolvers/Kd_Re_categories";

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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      credentials: true,
      origin: config.BACK_END_URL,
    })
  );

  /* ini passport */

  app.use(
    session({
      secret: config.DB_HOST || "fsdfsd",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({})

    })
  );
  
  app.use(passport.authenticate('session'));

  ///////////   apolloServer   //////////////
// Set up session

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        Follows,
        CategoriesResolver,
        Messages,
        Orders,
        Orders_imgs,
        Requirement_uploaders,
        Uploaded_files,
        Users,
      ],
    }),
    context: ({ req, res }) => ({ req, res, typeOrmConnection }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  ///////////express Middleware //////////////
  app.get("/", (_req, res) => {
    res.send("BACK END URL IS http://localhost:3000");
  });



  app.listen(PORT, () => {
    console.log("\x1b[33m%s\x1b[0m", `NODEJS SERVER RUNNING ON PORT:${PORT}`);
  });
};

main().catch((err) => console.log(err));
