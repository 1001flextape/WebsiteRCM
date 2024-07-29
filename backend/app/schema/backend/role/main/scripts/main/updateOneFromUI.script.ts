import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../utils/graphql/endMainFromError.func";
import makeBackendRoleSql from "../../../preMain/backendRole.sql";
import makeBackendRoleValidation from "../../../preMain/backendRole.validation";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import stringHelpers from "../../../../../utils/stringHelpers";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import makeBackendRoleManyPermissionMain from "../../backendRoleManyPermission.main";

type input = {
  id: string;
  name: string;
  isDashboardRead: boolean;
  isMediaManagerInboxOnly: boolean;
  isMediaManagerRead: boolean;
  isMediaManagerUpdate: boolean;
  isMediaManagerDelete: boolean;
  isSiteDesignerRead: boolean;
  isSiteDesignerUpdate: boolean;
  isSiteDesignerDelete: boolean;
  isAdminRead: boolean;
  isAdminUpdate: boolean;
  isAdminDelete: boolean;
  isUserManagementRead: boolean;
  isUserManagementUpdate: boolean;
  isUserManagementDelete: boolean;

}

export default function updateOneFromUI(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendRole> | null>> => {

    const backendRoleSql = makeBackendRoleSql(d);
    const backendRoleManyPermissionsMain = makeBackendRoleManyPermissionMain(d);
    const backendRoleValidation = makeBackendRoleValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_updateOneFromUI_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })

    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendRole_updateOneFromUI_error:0002"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await backendRoleSql.updateOne({
      id: args.id,
      name: args.name,
    }).catch(error => d.errorHandler(error, d.loggers))

    const currentPermissionsForRole = await backendRoleManyPermissionsMain.getManyByRoleId({
      roleId: args.id,
    })


    //////////////////////////////////////
    // Assemble data
    // ===================================    

    const newPermissionList = []

    if (args.isDashboardRead) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "2f30794d-3b68-42ed-bc02-4ac5a5cee91a")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
      })
    }

    if (args.isMediaManagerInboxOnly) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "f72294fb-c53e-4c6b-bcc4-c08aedd3695c")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
      })
    }

    if (args.isMediaManagerRead) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "e3f48381-31d3-4463-9861-5420d761c6e9")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "e3f48381-31d3-4463-9861-5420d761c6e9",
      })
    }

    if (args.isMediaManagerUpdate) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "c5184ea7-ec8b-4bda-abf0-29266eb40a53")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
      })
    }

    if (args.isMediaManagerDelete) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "bb7231a1-55d5-4655-8a72-2efef4e0b044")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
      })
    }

    if (args.isSiteDesignerRead) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "cba2838f-0ad4-4853-8c90-d96de96a74a3")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
      })
    }

    if (args.isSiteDesignerUpdate) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "30c4c4a8-f6cd-4233-8e30-502f9dcf0790")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
      })
    }

    if (args.isSiteDesignerDelete) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
      })
    }

    if (args.isAdminRead) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "6242feab-3e11-4cdf-92a6-0056e3cd2e32")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
      })
    }

    if (args.isAdminUpdate) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "290b547b-77db-4817-aff0-b3c81d77e8d8")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "290b547b-77db-4817-aff0-b3c81d77e8d8",
      })
    }

    if (args.isAdminDelete) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "0d85f1d5-01dd-4c2c-9316-996af2982b82")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
      })
    }

    if (args.isUserManagementRead) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "5970d023-e224-4e4e-830b-b3993d402616")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "5970d023-e224-4e4e-830b-b3993d402616",
      })
    }

    if (args.isUserManagementUpdate) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "438c338c-e478-40c5-8e7c-3987c88e0bcd")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "438c338c-e478-40c5-8e7c-3987c88e0bcd",
      })
    }

    if (args.isUserManagementDelete) {
      newPermissionList.push({
        id: currentPermissionsForRole.data
          .filter(p => p.dataValues.permissionId === "3df2f2c6-ef22-4226-96d6-be464da4f71a")[0]?.dataValues?.id || undefined,
        roleId: args.id,
        permissionId: "3df2f2c6-ef22-4226-96d6-be464da4f71a",
      })
    }



    //////////////////////////////////////
    // Finalize Sql
    // ===================================    
    await backendRoleManyPermissionsMain.setList(newPermissionList)

    return response
  }
}
