import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export default function isSettingReady(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<null>> => {
    try {
      const [result] = await d.db.query(`
        WITH backendSettingBackgroundColor_ready AS (
          SELECT "isReady" FROM public."backendSettingBackgroundColor"
        ),
        backendSettingColors_ready AS (
          SELECT "isReady" FROM public."backendSettingColors"
        ),
        backendSettingColumn_ready AS (
          SELECT "isReady" FROM public."backendSettingColumn"
        ),
        backendSettingFont_ready AS (
          SELECT "isReady" FROM public."backendSettingFont"
        ),
        backendSettingFooter_ready AS (
          SELECT "isReady" FROM public."backendSettingFooter"
        ),
        backendSettingHeader_ready AS (
          SELECT "isReady" FROM public."backendSettingHeader"
        ),
        backendSettingLink_ready AS (
          SELECT "isReady" FROM public."backendSettingLink"
        ),
        backendSettingSite_ready AS (
          SELECT "isReady" FROM public."backendSettingSite"
        ),
        backendSettingOrganization_ready AS (
          SELECT "isReady" FROM public."backendSettingOrganization"
        )
        SELECT 
          CASE
            WHEN COUNT(*) = SUM(CASE WHEN "isReady" = true THEN 1 ELSE 0 END)
            THEN true
            ELSE false
          END AS all_ready
        FROM (
          SELECT "isReady" FROM backendSettingBackgroundColor_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingColors_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingColumn_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingFont_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingFooter_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingHeader_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingLink_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingSite_ready
          UNION ALL
          SELECT "isReady" FROM backendSettingOrganization_ready
        ) AS all_settings;
      `, { transaction: d.dbTransaction });

      const isReady = (result[0] as any).all_ready;

      return {
        success: true,
        result: isReady,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        result: null,
      };
    }
  };
}
