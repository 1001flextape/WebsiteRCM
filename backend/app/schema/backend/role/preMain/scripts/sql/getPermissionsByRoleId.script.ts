import { Model, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import backendPermission from "../../../../../../models/backend/permission/backendPermission.model";
import backendRoleManyPermission from "../../../../../../models/backend/role/backendRoleManyPermission.model";

type input = {
  roleId: string
}

export default function getPermissionsByRoleId(d: dependencies) {
  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendPermission>[]>> => {
    try {
      // Fetch the associated permissions by roleId
      const permissions = await db.backendRoleManyPermission.findAll({
        where,
        include: [
          {
            model: db.backendPermission,
            required: false, // Left join
          },
        ],
        transaction: d.dbTransaction,
      }).catch(error => d.errorHandler(error, d.loggers));

      // Extract Model<backendPermission> instances from the results
      const backendPermissions = permissions.map((permission: backendRoleManyPermission) => permission.permission as Model<backendPermission>);

      return {
        success: true,
        data: backendPermissions,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: [],
      };
    }
  };
}
