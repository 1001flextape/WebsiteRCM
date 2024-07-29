import { Model } from "sequelize";
import bcrypt from "bcryptjs"
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string;
  email?: string;
  password?: string;
  isDeactivated?: boolean;
  isAdmin?: boolean;
}


export default function updateOne(d: dependencies) {
  const db = d.db.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    if (args.password) {
      args.password = bcrypt.hashSync(args.password, 8)
    }

    const data = await db.backendUser.update(
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


