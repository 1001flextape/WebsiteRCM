import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { CallByTypeEnum } from "../../../preMain/scripts/userProfileSql/upsertOne.script";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";
import backendUserProfile from "../../../../../../models/backend/user/backendUserProfile.model";

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

export default function updateOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUserProfile>>> => {

    const userProfileSql = makeBackendUserProfileSql(d)
    const userValidation = makeBackendUserValidation(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserProfile_upsertOne_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserProfile_upsertOne_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await userProfileSql.upsertOne({
      // birthday: args.birthday,
      userId: args.userId,
      displayName: args.displayName,
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username,
      picture: args.picture,
      callByType: args.callByType,
      circleColor: args.circleColor,
      labelColor: args.labelColor,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}