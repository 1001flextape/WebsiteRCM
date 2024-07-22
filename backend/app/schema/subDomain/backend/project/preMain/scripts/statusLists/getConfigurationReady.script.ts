import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getConfigurationReady(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<{ name: string, count: number }[]>> => {
    try {
      const [results] = await d.subDomainDb.query(`
        WITH backendSettingOrganization_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingOrganization"
          WHERE "isReady" IS TRUE
        ),
        backendSettingBackgroundColor_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingBackgroundColor"
          WHERE "isReady" IS TRUE
        ),
        backendSettingColors_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColors"
          WHERE "isReady" IS TRUE
        ),
        backendSettingColumn_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColumn"
          WHERE "isReady" IS TRUE
        ),
        backendSettingFont_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFont"
          WHERE "isReady" IS TRUE
        ),
        backendSettingFooter_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFooter"
          WHERE "isReady" IS TRUE
        ),
        backendSettingHeader_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingHeader"
          WHERE "isReady" IS TRUE
        ),
        backendSettingLink_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingLink"
          WHERE "isReady" IS TRUE
        ),
        backendSettingBrowser_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingSite"
          WHERE "isReady" IS TRUE
        )
        SELECT
          (SELECT count FROM backendSettingOrganization_count) AS "Organization",
          (SELECT count FROM backendSettingBackgroundColor_count) AS "Background Color",
          (SELECT count FROM backendSettingColors_count) AS "Colors",
          (SELECT count FROM backendSettingColumn_count) AS "Column",
          (SELECT count FROM backendSettingFont_count) AS "Font",
          (SELECT count FROM backendSettingFooter_count) AS "Footer",
          (SELECT count FROM backendSettingHeader_count) AS "Header",
          (SELECT count FROM backendSettingLink_count) AS "Link",
          (SELECT count FROM backendSettingBrowser_count) AS "Browser";
      `, { transaction: d.subDomainTransaction });

      const data = Object.entries(results[0]).map(([name, count]) => ({
        name,
        count: Number(count),
      })).filter(({name, count}) => count > 0);

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
