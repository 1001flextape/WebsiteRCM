import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";
import makeBackendUserSql from "../../../preMain/backendUser.sql";

type input = {
  userId: string;
}

type returnBasicViewType = {
  id: string;
  email: String;
  firstName: String;
  lastName: String;
  username: String;
  picture: String;
  callByType: String;
  circleColor: String;
  labelColor: String;
  displayName: string;
}

export default function them(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<returnBasicViewType>> => {

    const backendUserProfileSql = makeBackendUserProfileSql(d)
    const backendUserSql = makeBackendUserSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "'userId' is missing.",
        errorIdentifier: "backendUserBasicView_them_error:0001"
      })
    }

    const isUserIdUuid = stringHelpers.isStringValidUuid({
      str: args.userId,
    })

    if (!isUserIdUuid.result) {
      return endMainFromError({
        hint: "'userId' is not a UUID.",
        errorIdentifier: "backendUserBasicView_them_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const userResponse = await backendUserSql.getOneById({
      id: args.userId
    }).catch(error => d.errorHandler(error, d.loggers))

    const userProfileResponse = await backendUserProfileSql.getOneByUserId({
      userId: args.userId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: {
        // user table
        id: userResponse.data.dataValues.id,
        email: userResponse.data.dataValues.email,
        //user profile table
        firstName: userProfileResponse.data?.dataValues?.firstName,
        lastName: userProfileResponse.data?.dataValues?.lastName,
        username: userProfileResponse.data?.dataValues?.username,
        picture: userProfileResponse.data?.dataValues?.picture,
        callByType: userProfileResponse.data?.dataValues?.callByType,
        circleColor: userProfileResponse.data?.dataValues?.circleColor,
        labelColor: userProfileResponse.data?.dataValues?.labelColor,
        displayName: userProfileResponse.data?.dataValues.displayName,
      }
    }
  }
}