import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";

export enum CallByTypeEnum {
  EMAIL = "EMAIL",
  USERNAME = "USERNAME",
  FIRST_NAME = "FIRST_NAME",
  LAST_NAME = "LAST_NAME",
  FULL_NAME = "FULL_NAME",
}

type input = {
  userId: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  picture?: string;
  callByType?: CallByTypeEnum;
  circleColor?: string;
  labelColor?: string;
}

export default function upsertOne(d: dependencies) {

  const db = d.db.models;

  return async ({ userId, ...args }: input): Promise<returningSuccessObj<Model<backendUserProfile> | null>> => {

    //count for 1
    const doesUserHaveAProfile = await db.backendUserProfile.count({
      where: { userId, },
      transaction: d.dbTransaction,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

    //if not count, add instead
    if (!doesUserHaveAProfile) {
      const newData = await db.backendUserProfile.create(
        { userId, ...args },
        {
          transaction: d.dbTransaction,
          returning: true,
        }
      ).catch(error => d.errorHandler(error, d.loggers))

      return {
        success: true,
        data: newData,
      }
    }

    const data = await db.backendUserProfile.update(
      args,
      {
        where: { userId, },
        returning: true,
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}