import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  id?: string;
  userId: string;
  roleId: string;
};

export default function setList(d: dependencies) {
  const db = d.db.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {
    const userId = setArray[0]?.userId;

    // Step 1: Get all roles for the given userId
    const existingRoles = await db.backendUserManyRole.findAll({
      where: { userId },
      transaction: d.dbTransaction,
    });

    const usedRoles: string[] = [];

    // Step 2: Iterate over setArray and create, update, or track used roles
    for (const item of setArray) {
      if (item.id) {
        // Update existing role
        await db.backendUserManyRole.update(
          { roleId: item.roleId },
          {
            where: { id: item.id },
            transaction: d.dbTransaction,
          }
        );
        usedRoles.push(item.id);
      } else {
        // Create new role
        const newRole = await db.backendUserManyRole.create(
          { userId: item.userId, roleId: item.roleId },
          { transaction: d.dbTransaction }
        );
        usedRoles.push(newRole.dataValues.id);
      }
    }

    // Step 3: Delete unused roles
    for (const existingRole of existingRoles) {
      if (!usedRoles.includes(existingRole.dataValues.id)) {
        await existingRole.destroy({ transaction: d.dbTransaction });
      }
    }

    // Return response
    return {
      success: true,
      data: null,
    };
  };
}
