import { Transaction } from "sequelize"
import { Sequelize } from "sequelize-typescript"

export type dependencies = {

  // sub domain
  db?: Sequelize,
  dbTransaction?: Transaction,
  
  //singleton testing
  singletonSandbox?: string,

  // error handling
  errorHandler?: Function
  loggers?: any[]

}


