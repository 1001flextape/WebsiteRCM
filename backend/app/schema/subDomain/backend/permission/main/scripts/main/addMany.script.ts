import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";
import makeBackendPermissionValidation from "../../../preMain/backendPermission.validation";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  name: string
}

export default function addMany(d: dependencies) {
  return async (args: input[]): Promise<returningSuccessObj<Model<backendPermission>[] | null>> => {

    const permissionSql = makeBackendPermissionSql(d);
    const permissionValidation = makeBackendPermissionValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args || args?.length === 0) {
      return endMainFromError({
        hint: "No data was provided.",
        errorIdentifier: "backendPermission_addMany_error:0001",
      })
    }

    if (args.length > 50) {
      return endMainFromError({
        hint: "Only 50 records max can be processed at once.",
        errorIdentifier: "backendPermission_addMany_error:0002",
      })
    }

    const names = args.map(p => p.name).filter(name => name)

    if (names.length !== args.length) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendPermission_addMany_error:0003"
      })
    }

    const namesWithinLength = stringHelpers.areStringsLengthLessThan({
      length: 50,
      strArr: names,
    })

    if (!namesWithinLength.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendPermission_addMany_error:0004"
      })
    }

    const areNamesTaken = await permissionValidation.areNamesTaken({
      nameArray: names,
    }).catch(error => d.errorHandler(error, d.loggers))

    if (areNamesTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendPermission_addMany_error:0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await permissionSql.addMany(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
