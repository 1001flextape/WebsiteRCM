import connectToSubDomainDb from "./database/db";
import errorHandler from "./errorHandling/handers/errorHandler";
import { dependencies } from "./type/dependencyInjection.types";
import { Sequelize } from "sequelize-typescript";

export const makeDObj = async (): Promise<dependencies> => {
  const db: Sequelize = await connectToSubDomainDb();

  return {
    //database
    db,

    //handling errors
    errorHandler,
    loggers: [console],

  }
}
