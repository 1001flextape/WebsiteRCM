import { FindAndCountOptions, Op } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../utils/types/sequelize.types";

type multiDatabaseUserSearch = {
  id?: string,
  email?: string,
  isAdmin?: boolean,
  username?: string,
  firstName?: string,
  lastName?: string,
  birthday?: string,
  picture?: string,
  roleName?: string, // Update this to include role name in the result
}

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<multiDatabaseUserSearch>>> => {
    let { q, page, pageSize } = args;
    page = page ? page - 1 : 0;
    pageSize = pageSize || 10;

    if (page < 0) {
      return {
        success: false,
        humanMessage: "Please start the page at 1."
      };
    }
    if (pageSize < 0 || pageSize >= 100) {
      return {
        success: false,
        humanMessage: "Please keep pageSize in between 1 - 100."
      };
    }

    let search: FindAndCountOptions = {
      offset: page * pageSize,
      limit: pageSize,
      transaction: d.dbTransaction,
      include: [
        {
          model: db.backendUserProfile,
          as: 'profile',
          attributes: { exclude: ['id', 'userId'] }
        },
        {
          model: db.backendUserManyRole,
          as: 'userRoles',
          include: [
            {
              model: db.backendRole,
              as: 'role',
              attributes: ['name']
            }
          ]
        }
      ]
    };

    if (q) {
      search = {
        ...search,
        where: {
          [Op.or]: [
            { email: { [Op.like]: "%" + q + "%" } },
            { '$profile.username$': { [Op.like]: "%" + q + "%" } },
            { '$profile.firstName$': { [Op.like]: "%" + q + "%" } },
            { '$profile.lastName$': { [Op.like]: "%" + q + "%" } }
          ],
        }
      };
    }

    const { count, rows } = await db.backendUser.findAndCountAll(search).catch(error => d.errorHandler(error, d.loggers));

    const data = rows.map(user => ({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isDeactivated: user.isDeactivated,
      ...(user.profile ? user.profile.toJSON() : {
        username: null,
        firstName: null,
        lastName: null,
        birthday: null,
        picture: null,
        displayName: null,
        callByType: null,
        circleColor: null,
        labelColor: null,
      }),
      roleId: user.dataValues.userRoles && user.dataValues.userRoles.length > 0 ? user.dataValues.userRoles[0].role.id : null,
      roleName: user.dataValues.userRoles && user.dataValues.userRoles.length > 0 ? user.dataValues.userRoles[0].role.name : null
    }));

    const response = {
      rows: data,
      count: count,
      page: page + 1,
      pageSize,
      pageCount: Math.ceil(count / pageSize),
    };

    return {
      success: true,
      data: response,
    };
  }
}
