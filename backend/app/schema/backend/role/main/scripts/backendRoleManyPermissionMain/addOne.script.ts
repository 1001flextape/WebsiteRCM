import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleManyPermissionSql from "../../../preMain/backendRoleManyPermission.sql";
import makeBackendRoleManyPermissionValidation from "../../../preMain/backendRoleManyPermission.validation";
import backendRoleManyPermission from "../../../../../../models/backend/role/backendRoleManyPermission.model";
import stringHelpers from "../../../../../utils/stringHelpers";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import makeBackendPermissionEntity from "../../../../permission";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  permissionId: string
  roleId: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRoleManyPermission> | null>> => {
    const { roleId, permissionId } = args

    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d);
    const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d);
    const roleValidation = makeBackendRoleValidation(d);
    const { permissionEntity } = makeBackendPermissionEntity(d);

    //////////////////////////////////////
    // Validations
    // ===================================
    if (!permissionId) {
      return endMainFromError({
        hint: "Datapoint 'permissionId' is missing.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0001"
      })
    }

    const isPermissionIdUuid = stringHelpers.isStringValidUuid({
      str: permissionId
    })

    if (!isPermissionIdUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'permissionId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0002"
      })
    }

    if (!roleId) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is missing.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0003"
      })
    }

    const isRoleIdUuid = stringHelpers.isStringValidUuid({
      str: roleId
    })

    if (!isRoleIdUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0004"
      })
    }

    const isPermissionIdValid = await permissionEntity.isIdValid({
      id: permissionId,
    })

    const isRoleIdValid = await roleValidation.isIdValid({
      id: roleId,
    })

    if (!isPermissionIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0005"
      })
    }

    if (!isRoleIdValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid UUID.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0006"
      })
    }

    const doesRoleHavePermission = await roleManyPermissionValidation.doesRoleHavePermission({
      permissionId: permissionId,
      roleId: roleId,
    })

    if (doesRoleHavePermission.result) {
      return endMainFromError({
        hint: "Can not add because role has permission.",
        errorIdentifier: "backendRoleManyPermission_addOne_error:0007"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await roleManyPermissionSql.addOne({
      permissionId,
      roleId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
