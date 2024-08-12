import { Model } from "sequelize";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  email: string;
  password?: string;
  isDeactivated?: boolean;
  isAdmin?: boolean;
  temporaryPassword?: string;
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    if (args.password) {
      args.password = bcrypt.hashSync(args.password, 8);
    } else {
      args.temporaryPassword = crypto.randomBytes(8).toString('hex'); // Generates a random password.
    }

    const data = await db.backendUser.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    );

    // .catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    };
  }
}
