import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getConfigurationChangedCount(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      const [result] = await d.db.query(`
        WITH backendSettingOrganization_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingOrganization"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingBackgroundColor_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingBackgroundColor"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingColors_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColors"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingColumn_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColumn"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingFont_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFont"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingFooter_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFooter"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingHeader_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingHeader"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingLink_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingLink"
          WHERE "isChanged" IS TRUE
        ),
        backendSettingSite_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingSite"
          WHERE "isChanged" IS TRUE
        )
        SELECT
          (SELECT count FROM backendSettingOrganization_count) +
          (SELECT count FROM backendSettingBackgroundColor_count) +
          (SELECT count FROM backendSettingColors_count) +
          (SELECT count FROM backendSettingColumn_count) +
          (SELECT count FROM backendSettingFont_count) +
          (SELECT count FROM backendSettingFooter_count) +
          (SELECT count FROM backendSettingHeader_count) +
          (SELECT count FROM backendSettingLink_count) +
          (SELECT count FROM backendSettingSite_count) AS total_count;
      `, { transaction: d.dbTransaction });

      return {
        success: true,
        data: parseInt((result[0] as any).total_count),
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
