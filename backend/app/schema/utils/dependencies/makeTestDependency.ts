import { Transaction } from "sequelize";
import connectToSubDomainTestDb from "./database/test.db";
import errorHandler from "./errorHandling/handers/errorHandler";
import { dependencies } from "./type/dependencyInjection.types";
import { Sequelize } from "sequelize-typescript";

export const makeDTestObj = async (): Promise<dependencies> => {
  const db: Sequelize = await connectToSubDomainTestDb();
  const dbTransaction: Transaction = await db.transaction()

  return {
    //database
    db,
    dbTransaction,

    //handling errors
    errorHandler,
    loggers: [console],

  }
}
