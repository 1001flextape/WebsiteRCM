import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  id?: string;
  userId: string;
  permissionId: string;
};

export default function setList(d: dependencies) {
  const db = d.db.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {
    const userId = setArray[0]?.userId;

    // Step 1: Get all permissions for the given userId
    const existingPermissions = await db.backendUserManyPermission.findAll({
      where: { userId },
      transaction: d.dbTransaction,
    });

    const usedPermissions: string[] = [];

    // Step 2: Iterate over setArray and create, update, or track used permissions
    for (const item of setArray) {
      if (item.id) {
        // Update existing permission
        await db.backendUserManyPermission.update(
          { permissionId: item.permissionId },
          {
            where: { id: item.id },
            transaction: d.dbTransaction,
          }
        );
        usedPermissions.push(item.id);
      } else {
        // Create new permission
        const newPermission = await db.backendUserManyPermission.create(
          { userId: item.userId, permissionId: item.permissionId },
          { transaction: d.dbTransaction }
        );
        usedPermissions.push(newPermission.dataValues.id);
      }
    }

    // Step 3: Delete unused permissions
    for (const existingPermission of existingPermissions) {
      if (!usedPermissions.includes(existingPermission.dataValues.id)) {
        await existingPermission.destroy({ transaction: d.dbTransaction });
      }
    }

    // Return response
    return {
      success: true,
      data: null,
    };
  };
}
