import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendNotificationSql from "../../../preMain/backendNotification.sql";
import makeBackendNotificationValidation from "../../../preMain/backendNotification.validation";
import backendNotification from "../../../../../../../models/subDomain/backend/notification/backendNotification.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";


type input = {
  userId: string,
  count?: number
}

export default function getFirstByCount(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendNotification>[] | null>> => {

    const backendNotificationSql = makeBackendNotificationSql(d);
    const backendNotificationValidation = makeBackendNotificationValidation(d);

    //////////////////////////////////////
    // Validations
    // ==================================

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendNotification_getFirstByCount_error:0001"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await backendNotificationSql.getFirstByCount({
      userId: args.userId,
      count: args.count
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
