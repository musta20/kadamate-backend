"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Kd_Mo_users_1 = require("../modules/Kd_Mo_users");
const Kd_Mo_follows_1 = require("../modules/Kd_Mo_follows");
const Kd_Mo_categories_1 = require("../modules/Kd_Mo_categories");
const Kd_Mo_orders_1 = require("../modules/Kd_Mo_orders");
const Kd_Mo_orders_imgs_1 = require("../modules/Kd_Mo_orders_imgs");
const Kd_Mo_requirement_uploaders_1 = require("../modules/Kd_Mo_requirement_uploaders");
const Kd_Mo_messages_1 = require("../modules/Kd_Mo_messages");
const Kd_Mo_services_1 = require("../modules/Kd_Mo_services");
const Kd_Mo_uploaded_files_1 = require("../modules/Kd_Mo_uploaded_files");
const config_1 = __importDefault(require("../../config"));
const typeormconfig = {
    type: config_1.default.DB_TYPE,
    host: config_1.default.DB_HOST,
    port: config_1.default.DB_PORT,
    database: config_1.default.DB_NAME,
    entities: [
        Kd_Mo_uploaded_files_1.UploadedFiles,
        Kd_Mo_services_1.Services,
        Kd_Mo_messages_1.Messages,
        Kd_Mo_requirement_uploaders_1.RequirementUploaders,
        Kd_Mo_orders_imgs_1.OrderImg,
        Kd_Mo_orders_1.Orders,
        Kd_Mo_categories_1.Categories,
        Kd_Mo_follows_1.Follows,
        Kd_Mo_users_1.Users,
    ],
    synchronize: true,
    logging: config_1.default.DB_LOGGING,
};
exports.default = typeormconfig;
//# sourceMappingURL=MoConfig.js.map