import { Model } from "sequelize";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserProfileMain from "../../backendUserProfile.main";
import getRandomColor from "../../../../../utils/helpers/getRandomColor";
import { CallByTypeEnum } from "../../../preMain/scripts/userProfileSql/upsertOne.script";
import makeBackendMediaManagerFolderMain from "../../../../mediaManager/main/backendMediaManagerFolder.main";


type input = {
  email: string;
  password?: string;
  isDeactivated?: boolean;
  isAdmin?: boolean;
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const backendUserSql = makeBackendUserSql(d)
    const backendUserProfileMain = makeBackendUserProfileMain(d)
    const backendUserValidation = makeBackendUserValidation(d)
    const backendMediaManagerFolder = makeBackendMediaManagerFolderMain(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "'email' is missing.",
        errorIdentifier: "backendUser_addOne_error:0001"
      })
    }

    const isEmailValid = stringHelpers.isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "backendUser_addOne_error:0002"
      })
    }

    if (args.password) {
      const isPasswordValid: returningSuccessObj<null> = await backendUserValidation.isPasswordValid({
        password: args.password,
      }).catch(error => d.errorHandler(error, d.loggers))

      if (!isPasswordValid.result) {
        return endMainFromError({
          hint: isPasswordValid.humanMessage,
          errorIdentifier: "backendUser_addOne_error:0004"
        })
      }
    }

    const isEmailTaken = await backendUserValidation.isEmailTaken({
      email: args.email,
    }).catch(error => d.errorHandler(error, d.loggers))

    if (isEmailTaken.result) {
      return endMainFromError({
        hint: "Email is taken.",
        errorIdentifier: "backendUser_addOne_error:0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    // if null, make false as default
    if (!args.isAdmin) {
      args.isAdmin = false;
    }

    const doesAUserExists = await backendUserValidation.doesAUserExists()

    // first user is an Admin
    if (!doesAUserExists.result) {
      args.isAdmin = true;
    }

    const response = await backendUserSql.addOne({
      email: args.email,
      password: args.password,
      isAdmin: args.isAdmin,
    })
    // .catch(error => d.errorHandler(error, d.loggers))

    // new user gets a profile.
    await backendUserProfileMain.upsertOne({
      userId: response.data.dataValues.id,
      labelColor: getRandomColor(),
      circleColor: getRandomColor(),
      callByType: CallByTypeEnum.EMAIL,
    })

    // create user inbox in media manager.
    const userfolder = await backendMediaManagerFolder.addOne({
      createdBy: response.data.dataValues.id,
      name: response.data.dataValues.email,
      folderId: "34c5f602-0400-48e7-9004-dd8237956d7c",
    })

    return response;
  }
}