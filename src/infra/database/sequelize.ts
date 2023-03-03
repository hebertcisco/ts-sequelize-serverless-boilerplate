import { Sequelize } from "sequelize";
import { pg_config } from "../../config/pg-config";

export const sequelize = new Sequelize({
  host: pg_config.host,
  dialect: "postgres",
  database: pg_config.database,
  username: pg_config.user,
  port: pg_config.port,
  password: pg_config.password,
});

export default sequelize;
