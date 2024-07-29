import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePage from "../../../../../../models/client/site/clientSitePage.model";

type input = { 
  slug: string
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<clientSitePage> | null>> => {

    const data = await db.clientSitePage.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


