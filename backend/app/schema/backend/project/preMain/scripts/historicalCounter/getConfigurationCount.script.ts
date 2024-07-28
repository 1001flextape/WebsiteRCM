import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  projectId: string;
}

export default function getConfigurationCount(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<number>> => {
    try {
      const [result] = await d.db.query(`
        WITH backendProjectOrganization_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectOrganization"
          WHERE "projectId" = :projectId
        ),
        backendProjectBackgroundColor_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectBackgroundColor"
          WHERE "projectId" = :projectId
        ),
        backendProjectColors_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectColors"
          WHERE "projectId" = :projectId
        ),
        backendProjectColumn_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectColumn"
          WHERE "projectId" = :projectId
        ),
        backendProjectFont_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectFont"
          WHERE "projectId" = :projectId
        ),
        backendProjectFooter_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectFooter"
          WHERE "projectId" = :projectId
        ),
        backendProjectHeader_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectHeader"
          WHERE "projectId" = :projectId
        ),
        backendProjectLink_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectLink"
          WHERE "projectId" = :projectId
        ),
        backendProjectBrowser_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendProjectBrowser"
          WHERE "projectId" = :projectId
        )
        SELECT
          (SELECT count FROM backendProjectOrganization_count) +
          (SELECT count FROM backendProjectBackgroundColor_count) +
          (SELECT count FROM backendProjectColors_count) +
          (SELECT count FROM backendProjectColumn_count) +
          (SELECT count FROM backendProjectFont_count) +
          (SELECT count FROM backendProjectFooter_count) +
          (SELECT count FROM backendProjectHeader_count) +
          (SELECT count FROM backendProjectLink_count) +
          (SELECT count FROM backendProjectBrowser_count) AS total_count;
      `, {
        replacements: {
          projectId: args.projectId
        },
        transaction: d.dbTransaction,
      });

      return {
        success: true,
        data: parseInt((result[0] as any).total_count, 10),
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
