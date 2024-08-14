import { Op } from "sequelize";
import backendRoleManyPermission from "../../../../../../models/backend/role/backendRoleManyPermission.model";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id?: string;
  roleId: string;
  permissionId: string;
};

export default function setList(d: dependencies) {

  const db = d.db.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    // 1) Get all roles by roleId
    const existingRoles = await db.backendRoleManyPermission.findAll({
      where: { roleId: setArray[0].roleId },
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers));

    if (!existingRoles) {
      return { success: false, data: null };
    }

    const usedRoleIds: string[] = [];

    // 2) Iterate over setArray
    for (const item of setArray) {
      if (item.id) {
        // 2b) Update the record if it has an id
        await db.backendRoleManyPermission.update(
          { permissionId: item.permissionId },
          {
            where: { id: item.id },
            transaction: d.dbTransaction,
          }
        ).catch(error => d.errorHandler(error, d.loggers));

        usedRoleIds.push(item.id);
      } else {
        // 2a) Create the record if it doesn't have an id
        const newRole = await db.backendRoleManyPermission.create(
          {
            roleId: item.roleId,
            permissionId: item.permissionId,
          },
          {
            transaction: d.dbTransaction,
          }
        ).catch(error => d.errorHandler(error, d.loggers));

        if (newRole) usedRoleIds.push(newRole.id);
      }
    }

    // 3) Delete roles not used in setArray
    const rolesToDelete = existingRoles.filter(
      role => !usedRoleIds.includes(role.id)
    );

    for (const role of rolesToDelete) {
      await role.destroy({ transaction: d.dbTransaction })
        .catch(error => d.errorHandler(error, d.loggers));
    }

    return {
      success: true,
      data: null,
    };
  };
}
