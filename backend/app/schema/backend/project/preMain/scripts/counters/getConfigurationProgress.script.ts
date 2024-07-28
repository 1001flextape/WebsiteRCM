import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function getConfigurationProgress(d: dependencies) {
  const db = d.db.models;

  // Variable to define the total number of tables
  const totalTables = 9;

  return async (): Promise<returningSuccessObj<number>> => {
    try {
      const [result] = await d.db.query(`
        WITH backendSettingOrganization_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingOrganization"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingBackgroundColor_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingBackgroundColor"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingColors_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColors"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingColumn_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingColumn"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingFont_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFont"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingFooter_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingFooter"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingHeader_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingHeader"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingLink_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingLink"
          WHERE "isReady" IS NOT TRUE
        ),
        backendSettingSite_count AS (
          SELECT COUNT(*) AS count
          FROM public."backendSettingSite"
          WHERE "isReady" IS NOT TRUE
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
          (SELECT count FROM backendSettingSite_count) AS not_ready_count;
      `, { transaction: d.dbTransaction });

      const notReadyCount = parseInt((result[0] as any).not_ready_count);
      const percentageCompleted = Math.ceil(((totalTables - notReadyCount) / totalTables) * 100);

      return {
        success: true,
        data: percentageCompleted,
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
