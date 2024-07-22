import { FindAndCountOptions, Op } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { findAndCountAll } from "../../../../../../utils/types/sequelize.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage from "../../../../../../../models/subDomain/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  q?: string
  page?: number
  pageSize?: number
}

export default function getManyPublishedPagesChangeWithPagination(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input = {}): Promise<returningSuccessObj<findAndCountAll<backendSiteDesignerPage>>> => {
    let { q, page = 1, pageSize = 10 } = args;

    if (page < 0) {
      page = 1;
    }

    if (pageSize < 0) {
      pageSize = 10;
    }

    const offset = (page - 1) * pageSize;

    let search: FindAndCountOptions = {
      where: {
        isPublished: true,
        isChanged: true,
      },
      offset,
      limit: pageSize,
      transaction: d.subDomainTransaction,
    };

    if (q) {
      search = {
        ...search,
        where: {
          ...search.where,
          nickname: {
            [Op.like]: `%${q}%`,
          },
        },
      }
    }

    let data: findAndCountAll<backendSiteDesignerPage> = await db.backendSiteDesignerPage.findAndCountAll(search)
      .catch(error => {
        d.errorHandler(error, d.loggers);
        return { rows: [], count: 0, page: 1, pageSize: 10, pageCount: 1 };
      });

    data.page = page;
    data.pageSize = pageSize;
    data.pageCount = Math.ceil(data.count / data.pageSize);

    return {
      success: true,
      data,
    }
  }
}
