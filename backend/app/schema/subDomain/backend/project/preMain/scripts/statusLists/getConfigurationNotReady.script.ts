import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getConfigurationNotReady(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<{ name: string, id: string, isReady: boolean }[]>> => {
    try {
      const [results] = await d.subDomainDb.query(`
        WITH backendSettingOrganization AS (
          SELECT 'Organization' AS name, id, "isReady"
          FROM public."backendSettingOrganization"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingBackgroundColor AS (
          SELECT 'Background Color' AS name, id, "isReady"
          FROM public."backendSettingBackgroundColor"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingColors AS (
          SELECT 'Colors' AS name, id, "isReady"
          FROM public."backendSettingColors"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingColumn AS (
          SELECT 'Column' AS name, id, "isReady"
          FROM public."backendSettingColumn"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingFont AS (
          SELECT 'Font' AS name, id, "isReady"
          FROM public."backendSettingFont"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingFooter AS (
          SELECT 'Footer' AS name, id, "isReady"
          FROM public."backendSettingFooter"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingHeader AS (
          SELECT 'Header' AS name, id, "isReady"
          FROM public."backendSettingHeader"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingLink AS (
          SELECT 'Link' AS name, id, "isReady"
          FROM public."backendSettingLink"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingBrowser AS (
          SELECT 'Browser' AS name, id, "isReady"
          FROM public."backendSettingSite"
          WHERE "isReady" IS NOT TRUE
        )
        SELECT * FROM backendSettingOrganization
        UNION ALL
        SELECT * FROM backendSettingBackgroundColor
        UNION ALL
        SELECT * FROM backendSettingColors
        UNION ALL
        SELECT * FROM backendSettingColumn
        UNION ALL
        SELECT * FROM backendSettingFont
        UNION ALL
        SELECT * FROM backendSettingFooter
        UNION ALL
        SELECT * FROM backendSettingHeader
        UNION ALL
        SELECT * FROM backendSettingLink
        UNION ALL
        SELECT * FROM backendSettingBrowser;
      `, { transaction: d.subDomainTransaction });

      const data = results.map((row: any) => ({
        name: row.name,
        id: row.id,
        isReady: row.isReady,
      })).filter((row) => {
        if (row.isReady) {
          return false;
        }

        return true;
      })

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
