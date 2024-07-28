// import { Model } from "sequelize";
// import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
// import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
// import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler";
// import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
// import makeBackendRoleManyPermissionSql from "../../../preMain/backendRoleManyPermission.sql";
// import makeBackendRoleManyPermissionValidation from "../../../preMain/backendRoleManyPermission.validation";
// import stringHelpers from "../../../../../../utils/stringHelpers";
// import backendRoleManyPermission from "../../../../../../../models/backend/role/backendRoleManyPermission.model";
// import makeBackendPermissionEntity from "../../../../permission";
// import makeBackendRoleValidation from "../../../preMain/backendRole.validation";

// type input = {
//   permissionId: string
//   roleId: string
// }

// export default function addMany({ db, errorHandler, dbTransaction, loggers }: d_sub) {
//   return async (args: input[]): Promise<returningSuccessObj<Model<backendRoleManyPermission>[] | null>> => {

//     const d = {
//       db,
//       errorHandler,
//       dbTransaction,
//       loggers,
//     }
//     const roleManyPermissionSql = makeBackendRoleManyPermissionSql(d);
//     const roleManyPermissionValidation = makeBackendRoleManyPermissionValidation(d);
//     const roleValidation = makeBackendRoleValidation(d);
//     const { permissionEntity } = makeBackendPermissionEntity(d);

//     //////////////////////////////////////
//     // Validations
//     // ===================================

//     if (!args || args?.length === 0) {
//       return endMainFromError({
//         hint: "No data was provided.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0001",
//       })
//     }

//     if (args.length > 50) {
//       return endMainFromError({
//         hint: "Only 50 records max can be processed at once.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0002",
//       })
//     }

//     const allPermissionIds = args.map(r => r.permissionId)
//     const allRoleIds = args.map(r => r.roleId)

//     const areStringsValidUuids = stringHelpers.areStringsValidUuids({
//       strArr: [
//         ...allPermissionIds,
//         ...allRoleIds,
//       ]
//     })

//     const allRoleIdsValid = await roleValidation.areIdsValid({
//       idArray: allRoleIds
//     })
//     const allPermisisonIdsValid = await permissionEntity.areIdsValid({
//       idArray: allPermissionIds
//     })

//     if (allPermissionIds.length !== args.length) {
//       return endMainFromError({
//         hint: "Datapoint 'permissionId' is missing.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0003"
//       })
//     }

//     if (allRoleIds.length !== args.length) {
//       return endMainFromError({
//         hint: "Datapoint 'roleId' is not valid.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0004"
//       })
//     }

//     if (!areStringsValidUuids.result) {
//       return endMainFromError({
//         hint: "Datapoint 'id' does not have proper UUID format.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0005"
//       })
//     }

//     if (!allRoleIdsValid.result) {
//       return endMainFromError({
//         hint: "Datapoint 'roleId' is missing.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0006"
//       })
//     }

//     if (!allPermisisonIdsValid.result) {
//       return endMainFromError({
//         hint: "Datapoint 'roleId' is not valid.",
//         errorIdentifier: "backendRoleManyPermission_addMany_error:0007"
//       })
//     }

//     //////////////////////////////////////
//     // Sql
//     // ===================================    

//     const response = await roleManyPermissionSql.addMany(args).catch(error => errorHandler(error, loggers))

//     return response
//   }
// }
