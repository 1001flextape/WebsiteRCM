import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendMediaManagerFile from "../../../../../../models/backend/mediaManager/backendMediaManagerFile.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { 
  id: string, 
  userFileName?: string 
  systemFileName?: string 
  url?: string
  folderId?: string,
}

export default function updateOne(d: dependencies) {

  const db = d.db.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendMediaManagerFile> | null>> => {

    const data = await db.backendMediaManagerFile.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


