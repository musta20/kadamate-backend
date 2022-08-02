import { Users } from "../modules/Kd_Mo_users";
import { Follows } from "../modules/Kd_Mo_follows";
import { Categories } from "../modules/Kd_Mo_categories";
import { Orders } from "../modules/Kd_Mo_orders";
import { OrderImg } from "../modules/Kd_Mo_orders_imgs";
import { RequirementUploaders } from "../modules/Kd_Mo_requirement_uploaders";
import { Messages } from "../modules/Kd_Mo_messages";
import { Services } from "../modules/Kd_Mo_services";
import { UploadedFiles } from "../modules/Kd_Mo_uploaded_files";

import { DataSourceOptions } from "typeorm/data-source";
import config from "../../config";

const typeormconfig: DataSourceOptions = {
  type: config.DB_TYPE,
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
  entities: [
    UploadedFiles,
    Services,
    Messages,
    RequirementUploaders,
    OrderImg,
    Orders,
    Categories,
    Follows,
    Users,
  ],
  synchronize: true,
  logging: config.DB_LOGGING,
};

export default typeormconfig;
