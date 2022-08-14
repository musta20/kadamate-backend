"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MoConfig_1 = __importDefault(require("././src/dataBase/MoConfig"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Auth_1 = require("./src/middleware/Auth/Auth");
const Kd_Re_categories_1 = require("./src/Resolvers/Kd_Re_categories");
const Kd_Re_follows_1 = require("./src/Resolvers/Kd_Re_follows");
const Kd_Re_messages_1 = require("./src/Resolvers/Kd_Re_messages");
const Kd_Re_orders_imgs_1 = require("./src/Resolvers/Kd_Re_orders_imgs");
const Kd_Re_orders_1 = require("./src/Resolvers/Kd_Re_orders");
const Kd_Re_requirement_uploaders_1 = require("./src/Resolvers/Kd_Re_requirement_uploaders");
const Kd_Re_uploaded_files_1 = require("./src/Resolvers/Kd_Re_uploaded_files");
const Kd_Re_users_1 = require("./src/Resolvers/Kd_Re_users");
const constants_1 = require("./constants");
const Kd_Re_services_1 = require("./src/Resolvers/Kd_Re_services");
const main = async () => {
    const PORT = config_1.default.SERVER_PORT;
    const typeOrmConnection = await new typeorm_1.DataSource(MoConfig_1.default);
    typeOrmConnection
        .initialize()
        .then(() => {
        console.log("\x1b[32m%s\x1b[0m", `Data Source has been initialized!`);
    })
        .catch((err) => {
        console.log("\x1b[31m%s\x1b[0m", "Error during Data Source initialization", err);
    });
    const app = (0, express_1.default)();
    app.use((0, express_session_1.default)({
        name: "billtoken",
        store: connect_mongo_1.default.create({
            mongoUrl: "mongodb://localhost:27017/session",
        }),
        cookie: {
            maxAge: 315360000000,
            httpOnly: false,
            secure: false,
        },
        saveUninitialized: false,
        secret: "keyboardcat",
        resave: false,
    }));
    app.use(Auth_1.Passport.authenticate("session", { session: false }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
        credentials: true,
        origin: constants_1.__prod__ ? config_1.default.APOLLO_URL : config_1.default.BACK_END_URL,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
    }));
    app.use(Auth_1.router);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                Kd_Re_follows_1.FollowsResolver,
                Kd_Re_categories_1.CategoriesResolver,
                Kd_Re_messages_1.MessagesResolver,
                Kd_Re_orders_imgs_1.OrderImgResolver,
                Kd_Re_orders_1.OrdersResolver,
                Kd_Re_requirement_uploaders_1.RequirementUploadersResolver,
                Kd_Re_uploaded_files_1.UploadedFilesResulver,
                Kd_Re_users_1.UserResolver,
                Kd_Re_services_1.ServicesResulver,
            ],
        }),
        context: ({ req, res }) => ({ req, res, typeOrmConnection }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.get("/", (_req, res) => {
        res.send("BACK END URL IS http://localhost:3000");
    });
    app.listen(PORT, () => {
        console.log("\x1b[33m%s\x1b[0m", `NODEJS SERVER RUNNING ON PORT:${PORT}`);
    });
};
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map