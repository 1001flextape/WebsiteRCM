import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getConfigurationNotReadyCount(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      const [result] = await d.subDomainDb.query(`
        WITH backendSettingOrganization_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingOrganization"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingBackgroundColor_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingBackgroundColor"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingColors_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColors"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingColumn_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColumn"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingFont_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFont"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingFooter_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFooter"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingHeader_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingHeader"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingLink_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingLink"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
        ),
        backendSettingSite_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingSite"
          WHERE "isReady" IS FALSE OR "isReady" IS NULL
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
      `, { transaction: d.subDomainTransaction });

      // Log the raw query result for debugging
      console.log('Raw query result:', result);

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
