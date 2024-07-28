import bcrypt from "bcryptjs"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  password: string;
  encryptedPassword: string;
}

export default function isPasswordCorrect(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const result = bcrypt.compareSync(args.password, args.encryptedPassword)

    return {
      success: true,
      result,
    }
  }
}