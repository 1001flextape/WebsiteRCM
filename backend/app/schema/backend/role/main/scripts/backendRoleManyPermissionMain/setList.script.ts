import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleManyPermissionSql from "../../../preMain/backendRoleManyPermission.sql";
import stringHelpers from "../../../../../utils/stringHelpers";
import backendRoleManyPermission from "../../../../../../models/backend/role/backendRoleManyPermission.model";
import makeBackendPermissionEntity from "../../../../permission";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string
  permissionId: string
  roleId: string
}

export default function setList(d: dependencies) {
  return async (args: input[]): Promise<returningSuccessObj<Model<backendRoleManyPermission>[] | null>> => {

    const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d);
    const roleValidation = makeBackendRoleValidation(d);
    const { permissionEntity } = makeBackendPermissionEntity(d);

    //////////////////////////////////////
    // Validations
    // ===================================
    const allPermissionIds = args.map(r => r.permissionId).filter(r => r)
    const allRoleIds = args.map(r => r.roleId).filter(r => r)
    const allIds = args.map(r => r.id).filter(r => r)

    const areStringsValidUuids = stringHelpers.areStringsValidUuids({
      strArr: [
        ...allPermissionIds,
        ...allRoleIds,
        ...allIds,
      ]
    })
    if (allPermissionIds.length !== args.length) {
      return endMainFromError({
        hint: "Datapoint 'permissionId' is missing.",
        errorIdentifier: "backendRoleManyPermission_setList_error:0001"
      })
    }

    if (allRoleIds.length !== args.length) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is missing.",
        errorIdentifier: "backendRoleManyPermission_setList_error:0002"
      })
    }

    if (!areStringsValidUuids.result) {
      return endMainFromError({
        hint: "String(s) don't have proper UUID format.",
        errorIdentifier: "backendRoleManyPermission_setList_error:0003"
      })
    }

    const allRoleIdsValid = await roleValidation.areIdsValid({
      idArray: allRoleIds.filter((item, index) => allRoleIds.indexOf(item) === index)
    })
    const allPermisisonIdsValid = await permissionEntity.areIdsValid({
      idArray: allPermissionIds.filter((item, index) => allPermissionIds.indexOf(item) === index)
    })

    if (!allRoleIdsValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is missing.",
        errorIdentifier: "backendRoleManyPermission_setList_error:0004"
      })
    }

    if (!allPermisisonIdsValid.result) {
      return endMainFromError({
        hint: "Datapoint 'roleId' is not valid.",
        errorIdentifier: "backendRoleManyPermission_setList_error:0005"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await roleManyPermissionSql.setList(args).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
