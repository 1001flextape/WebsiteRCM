import { FindAndCountOptions, Op } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../utils/types/sequelize.types";
import backendProjectPage from "../../../../../../models/backend/project/backendProjectPage.model";

type input = {
  projectId: string

  q?: string
  page?: number
  pageSize?: number
}

export default function getManyWithPagination(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<findAndCountAll<backendProjectPage>>> => {
    if (!args) {
      return {
        success: false,
        errorIdentifier: "backendProjectPage_getManyWithPagination_error:0001",
        humanMessage: "Missing property 'projectId'."
      }
    }

    let { q, page, pageSize, } = args

    if (args.page && args.page < 0) {
      args.page = 1
    }

    if (args.pageSize && args.pageSize < 0) {
      args.pageSize = 10
    }

    page = page ? page - 1 : 0;
    pageSize = pageSize || 10;


    let search: FindAndCountOptions = {
      offset: page * pageSize,
      limit: pageSize,
      transaction: d.dbTransaction,
    };

    if (q) {
      search = {
        ...search,
        where: {
          projectId: args.projectId,
          nickname: {
            [Op.like]: "%" + q + "%",
          },
        },
      }
    } else {
      search = {
        ...search,
        where: {
          projectId: args.projectId,
        },
      }
    }


    let data: findAndCountAll<backendProjectPage> = await db.backendProjectPage.findAndCountAll(search).catch(error => d.errorHandler(error, d.loggers)).catch(error => d.errorHandler(error, d.loggers))
    data.page = page + 1;
    data.pageSize = pageSize;
    data.pageCount = Math.ceil(
      data.count / data.pageSize
    );

    return {
      success: true,
      data,
    }
  }
}


