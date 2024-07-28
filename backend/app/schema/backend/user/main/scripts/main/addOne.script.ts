import { Model } from "sequelize";
import backendUser from "../../../../../../models/backend/user/backendUser.model";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import makeBackendUserValidation from "../../../preMain/backendUser.validation";
import addFirst from "./addFirst.private";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserProfileSql from "../../../preMain/backendUserProfile.sql";


type input = {
  email: string
  password: string
  isAdmin?: boolean
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendUser> | null>> => {

    const { errorHandler, loggers } = d

    const backendUserSql = makeBackendUserSql(d)
    const backendUserValidation = makeBackendUserValidation(d)

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

    if (!args.password) {
      return endMainFromError({
        hint: "Password is missing.",
        errorIdentifier: "backendUser_addOne_error:0003"
      })
    }

    const isPasswordValid: returningSuccessObj<null> = await foundationUserValidation.isPasswordValid({
      password: args.password,
    }).catch(error => errorHandler(error, loggers))

    if (!isPasswordValid.result) {
      return endMainFromError({
        hint: isPasswordValid.humanMessage,
        errorIdentifier: "backendUser_addOne_error:0004"
      })
    }

    const isEmailTaken = await foundationUserValidation.isEmailTaken({
      email: args.email,
    })
    //.catch(error => errorHandler(error, loggers))

    //////////////////////////////////////
    // Sql
    // ===================================  
    if (!args.isAdmin) {
      args.isAdmin = false;
    }

    const doesAUserExists = await foundationUserValidation.doesAUserExists()

    if (!doesAUserExists.result) {
      const addFirstFunction = addFirst(d)

      return await addFirstFunction({
        email: args.email,
        isAdmin: args.isAdmin,
        password: args.password,
        username: args.username,
      }).catch(error => errorHandler(error, loggers))
    }

    let foundationUserResponse: returningSuccessObj<Model<foundationUser>>
    let foundationUserProfileResponse: returningSuccessObj<Model<foundationUserProfile>>
    let backendUserResponse: returningSuccessObj<Model<backendUser>>

    if (!isEmailTaken.result) {
      foundationUserResponse = await foundationUserSql.addOne({
        email: args.email,
        password: args.password,
      }).catch(error => errorHandler(error, loggers))


      foundationUserProfileResponse = await foundationUserProfileSql.upsertOne({
        id: foundationUserResponse.data.dataValues.id,
        username: args.username
      })
  
      backendUserResponse = await backendUserSql.addOne({
        id: foundationUserResponse.data.dataValues.id,
        isAdmin: args.isAdmin,
      })
    } else {
      foundationUserResponse = await foundationUserSql.getOneByEmail({
        email: args.email,
      }).catch(error => errorHandler(error, loggers))

      foundationUserProfileResponse = await foundationUserProfileSql.upsertOne({
        id: foundationUserResponse.data.dataValues.id,
        username: args.username
      })
  
      backendUserResponse = await backendUserSql.updateOne({
        id: foundationUserResponse.data.dataValues.id,
        isAdmin: args.isAdmin,
      })
    }
    
    // .catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: {
        id: foundationUserResponse.data.dataValues.id,
        email: foundationUserResponse.data.dataValues.email,
        password: foundationUserResponse.data.dataValues.password,
        isAdmin: backendUserResponse.data.dataValues.isAdmin,
        username: foundationUserProfileResponse.data.dataValues.username,
      }
    }
  }
}