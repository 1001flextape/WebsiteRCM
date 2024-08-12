import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import makeBackendUserSql from "../../../preMain/backendUser.sql";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserManyPermissionMain from "../../backendUserManyPermission.main";
import makeBackendPermissionMain from "../../../../permission/main/backendPermission.main";
import RealTimeYDocAdapter from "../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import makeBackendUserManyRoleMain from "../../backendUserManyRole.main";
import makeBackendRoleMain from "../../../../role/main/backendRole.main";
import { Model } from "sequelize";
import backendRole from "../../../../../../models/backend/role/backendRole.model";
import makeBackendUserProfileMain from "../../backendUserProfile.main";
import RealTimeSelectAdapter from "../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSelectAdapter";

type input = {
  socketId: string;
  id: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = `backendSettingUser_${args.id}`

    const userSql = makeBackendUserSql(d);
    const userManyRoleMain = makeBackendUserManyRoleMain(d);
    const userManyPermissionMain = makeBackendUserManyPermissionMain(d);
    const roleMain = makeBackendRoleMain(d);
    const userProfileMain = makeBackendUserProfileMain(d)
    const permissionMain = makeBackendPermissionMain(d);
    const sameDoc = makeCollaborateSameDoc(d);

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    if (doesEntityExist.result) {
      //get
      const entityRecord = await sameDoc.getByEntity({
        entity,
      })

      await sameDoc.userConnectsToEntity({
        entity,
        socketId: args.socketId,
      })

      // // add subscription to user viewing entity
      // entityRecord.data.addSocket({
      //   socketId: args.socketId
      // })


      return {
        success: true,
        data: {
          ...entityRecord.data.props,
          ...entityRecord.data.nonRealTimeProps,
          entity,
        }
      }

    } else {

      const user = await userSql.getOneById({
        id: args.id,
      })

      const userProfile = await userProfileMain.getOneByUserId({
        userId: user.data.dataValues.id,
      })

      // Only one role per user in this application, but it was built for a many role upgrade.
      const manyRoles = await userManyRoleMain.getAll({
        userId: user.data.dataValues.id,
      })

      // let userRole: returningSuccessObj<Model<backendRole> | null>
      // if (manyRoles.data && manyRoles.data.length > 0) {
      //   userRole = await roleMain.getOneById({
      //     id: manyRoles.data[0].dataValues.roleId
      //   })
      // }

      // get permissions
      const manyPermissions = await userManyPermissionMain.getAll({
        userId: user.data.dataValues.id,
      })

      let userPermissions
      if (manyPermissions.data && manyPermissions.data.length > 0) {
        userPermissions = await permissionMain.getManyByIds(
          manyPermissions.data.map(p => p.dataValues.permissionId)
        )
      }

      const currentPermissionIds = manyPermissions.data.map(p => p.dataValues.permissionId)

      //adapter for every realtime property
      // const name: RealTimeAdapterPropertyValue = {
      //   adapter: new RealTimeYDocAdapter({
      //     initialText: record.data?.dataValues?.name || "",
      //     name: "name"
      //   }),
      //   name: "name"
      // }

      // ====================================
      // Create realtime records
      // ------------------------------------

      const isAdmin: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: user.data.dataValues.isAdmin || false,
          name: "isAdmin"
        }),
        name: "isAdmin"
      }

      const isDeactivated: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: user.data.dataValues.isDeactivated || false,
          name: "isDeactivated"
        }),
        name: "isDeactivated"
      }

      const role: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSelectAdapter({
          initialValue: manyRoles.data[0]?.dataValues?.roleId || "",
          name: "role"
        }),
        name: "role"
      }

      const isDashboardRead: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "2f30794d-3b68-42ed-bc02-4ac5a5cee91a").length > 0 || false,
          name: "isDashboardRead"
        }),
        name: "isDashboardRead"
      }

      const isMediaManagerInboxOnly: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "f72294fb-c53e-4c6b-bcc4-c08aedd3695c").length > 0 || false,
          name: "isMediaManagerInboxOnly"
        }),
        name: "isMediaManagerInboxOnly"
      }

      const isMediaManagerRead: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "e3f48381-31d3-4463-9861-5420d761c6e9").length > 0 || false,
          name: "isMediaManagerRead"
        }),
        name: "isMediaManagerRead"
      }

      const isMediaManagerUpdate: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "c5184ea7-ec8b-4bda-abf0-29266eb40a53").length > 0 || false,
          name: "isMediaManagerUpdate"
        }),
        name: "isMediaManagerUpdate"
      }

      const isMediaManagerDelete: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "bb7231a1-55d5-4655-8a72-2efef4e0b044").length > 0 || false,
          name: "isMediaManagerDelete"
        }),
        name: "isMediaManagerDelete"
      }

      const isSiteDesignerRead: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "cba2838f-0ad4-4853-8c90-d96de96a74a3").length > 0 || false,
          name: "isSiteDesignerRead"
        }),
        name: "isSiteDesignerRead"
      }

      const isSiteDesignerUpdate: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "30c4c4a8-f6cd-4233-8e30-502f9dcf0790").length > 0 || false,
          name: "isSiteDesignerUpdate"
        }),
        name: "isSiteDesignerUpdate"
      }

      const isSiteDesignerDelete: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811").length > 0 || false,
          name: "isSiteDesignerDelete"
        }),
        name: "isSiteDesignerDelete"
      }

      const isAdminRead: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "6242feab-3e11-4cdf-92a6-0056e3cd2e32").length > 0 || false,
          name: "isAdminRead"
        }),
        name: "isAdminRead"
      }

      const isAdminUpdate: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "290b547b-77db-4817-aff0-b3c81d77e8d8").length > 0 || false,
          name: "isAdminUpdate"
        }),
        name: "isAdminUpdate"
      }

      const isAdminDelete: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "0d85f1d5-01dd-4c2c-9316-996af2982b82").length > 0 || false,
          name: "isAdminDelete"
        }),
        name: "isAdminDelete"
      }

      const isUserManagementRead: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "5970d023-e224-4e4e-830b-b3993d402616").length > 0 || false,
          name: "isUserManagementRead"
        }),
        name: "isUserManagementRead"
      }

      const isUserManagementUpdate: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "438c338c-e478-40c5-8e7c-3987c88e0bcd").length > 0 || false,
          name: "isUserManagementUpdate"
        }),
        name: "isUserManagementUpdate"
      }

      const isUserManagementDelete: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: currentPermissionIds.filter(p => p === "3df2f2c6-ef22-4226-96d6-be464da4f71a").length > 0 || false,
          name: "isUserManagementDelete"
        }),
        name: "isUserManagementDelete"
      }








      const setEntity = await sameDoc.set({
        entity,
        properties: [
          isAdmin,
          isDeactivated,
          role,
          isDashboardRead,
          isMediaManagerInboxOnly,
          isMediaManagerRead,
          isMediaManagerUpdate,
          isMediaManagerDelete,
          isSiteDesignerRead,
          isSiteDesignerUpdate,
          isSiteDesignerDelete,
          isAdminRead,
          isAdminUpdate,
          isAdminDelete,
          isUserManagementRead,
          isUserManagementUpdate,
          isUserManagementDelete,
        ],
        nonRealTimeProps: {
          id: user.data.dataValues.id,
          email: user.data.dataValues.email,
          ...(userProfile.data?.dataValues || {}),
          temporaryPassword: user.data?.dataValues.temporaryPassword,
        },
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...setEntity.data.nonRealTimeProps,
          ...setEntity.data.props,
          entity,
        }
      }
    }
  }
}




// {
//   id: "2f30794d-3b68-42ed-bc02-4ac5a5cee91a",
//   name: 'dashboard-read',
// },
// {
//   id: "f72294fb-c53e-4c6b-bcc4-c08aedd3695c",
//   name: 'media-manager-inbox-only',
// },
// {
//   id: "e3f48381-31d3-4463-9861-5420d761c6e9",
//   name: 'media-manager-read',
// },
// {
//   id: "c5184ea7-ec8b-4bda-abf0-29266eb40a53",
//   name: 'media-manager-update',
// },
// {
//   id: "bb7231a1-55d5-4655-8a72-2efef4e0b044",
//   name: 'media-manager-delete',
// },
// {
//   id: "cba2838f-0ad4-4853-8c90-d96de96a74a3",
//   name: 'site-designer-read',
// },
// {
//   id: "30c4c4a8-f6cd-4233-8e30-502f9dcf0790",
//   name: 'site-designer-update',
// },
// {
//   id: "d9e5f3b9-a5bf-4d2f-9275-288b56bf3811",
//   name: 'site-designer-delete',
// },
// {
//   id: "6242feab-3e11-4cdf-92a6-0056e3cd2e32",
//   name: 'admin-read',
// },
// {
//   id: "290b547b-77db-4817-aff0-b3c81d77e8d8",
//   name: 'admin-update',
// },
// {
//   id: "0d85f1d5-01dd-4c2c-9316-996af2982b82",
//   name: 'admin-delete',
// },
// {
//   id: "5970d023-e224-4e4e-830b-b3993d402616",
//   name: 'user-management-read',
// },
// {
//   id: "438c338c-e478-40c5-8e7c-3987c88e0bcd",
//   name: 'user-management-update',
// },
// {
//   id: "3df2f2c6-ef22-4226-96d6-be464da4f71a",
//   name: 'user-management-delete',
// },