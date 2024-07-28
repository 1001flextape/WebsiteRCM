import { Model } from "sequelize";
import bcrypt from "bcryptjs"
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  email: string;
  password: string;
  isDeactivated?: boolean;
  isAdmin?: boolean;
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {
    
    args.password = bcrypt.hashSync(args.password, 8)

    const data = await db.backendUser.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    )

    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


