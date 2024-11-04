import pg from "pg";
import { Sequelize } from "sequelize";

export function getSequelize() {
  if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL not set");

  const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
  });

  return sequelize;
}

export async function connectToPostgres() {
  const sequelize = getSequelize();
  await sequelize.sync({ alter: true });
  return await sequelize.authenticate();
}
