import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  projectId: string;
}

export default function getConfiguration(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<{ name: string, id: string, isReady: boolean }[]>> => {
    try {
      const [results] = await d.subDomainDb.query(`
        WITH backendProjectOrganization AS (
          SELECT 'Organization' AS name, id
          FROM public."backendProjectOrganization"
          WHERE "projectId" = :projectId
        ),
        backendProjectBackgroundColor AS (
          SELECT 'Background Color' AS name, id
          FROM public."backendProjectBackgroundColor"
          WHERE "projectId" = :projectId
        ),
        backendProjectColors AS (
          SELECT 'Colors' AS name, id
          FROM public."backendProjectColors"
          WHERE "projectId" = :projectId
        ),
        backendProjectColumn AS (
          SELECT 'Column' AS name, id
          FROM public."backendProjectColumn"
          WHERE "projectId" = :projectId
        ),
        backendProjectFont AS (
          SELECT 'Font' AS name, id
          FROM public."backendProjectFont"
          WHERE "projectId" = :projectId
        ),
        backendProjectFooter AS (
          SELECT 'Footer' AS name, id
          FROM public."backendProjectFooter"
          WHERE "projectId" = :projectId
        ),
        backendProjectHeader AS (
          SELECT 'Header' AS name, id
          FROM public."backendProjectHeader"
          WHERE "projectId" = :projectId
        ),
        backendProjectLink AS (
          SELECT 'Link' AS name, id
          FROM public."backendProjectLink"
          WHERE "projectId" = :projectId
        ),
        backendProjectBrowser AS (
          SELECT 'Browser' AS name, id
          FROM public."backendProjectBrowser"
          WHERE "projectId" = :projectId
        )
        SELECT * FROM backendProjectOrganization
        UNION ALL
        SELECT * FROM backendProjectBackgroundColor
        UNION ALL
        SELECT * FROM backendProjectColors
        UNION ALL
        SELECT * FROM backendProjectColumn
        UNION ALL
        SELECT * FROM backendProjectFont
        UNION ALL
        SELECT * FROM backendProjectFooter
        UNION ALL
        SELECT * FROM backendProjectHeader
        UNION ALL
        SELECT * FROM backendProjectLink
        UNION ALL
        SELECT * FROM backendProjectBrowser;
      `, { 
        replacements: { projectId: args.projectId },
        transaction: d.subDomainTransaction 
      });

      const data = results.map((row: any) => ({
        name: row.name,
        id: row.id,
        isReady: row.isReady,
      }));

      return {
        success: true,
        data,
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
