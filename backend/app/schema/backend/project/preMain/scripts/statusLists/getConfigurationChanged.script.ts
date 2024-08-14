import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";


export default function getConfigurationChanged(d: dependencies) {

  const db = d.db.models;

  return async (): Promise<returningSuccessObj<{ name: string, id: string, isReady: boolean }[]>> => {
    try {
      const [results] = await d.db.query(`
WITH backendSettingOrganization AS (
  SELECT 'Organization' AS name, id, "isReady"
  FROM public."backendSettingOrganization"
  WHERE "isChanged" IS TRUE
),
backendSettingBackgroundColor AS (
  SELECT 'Background Color' AS name, id, "isReady"
  FROM public."backendSettingBackgroundColor"
  WHERE "isChanged" IS TRUE
),
backendSettingColors AS (
  SELECT 'Colors' AS name, id, "isReady"
  FROM public."backendSettingColors"
  WHERE "isChanged" IS TRUE
),
backendSettingColumn AS (
  SELECT 'Column' AS name, id, "isReady"
  FROM public."backendSettingColumn"
  WHERE "isChanged" IS TRUE
),
backendSettingFont AS (
  SELECT 'Font' AS name, id, "isReady"
  FROM public."backendSettingFont"
  WHERE "isChanged" IS TRUE
),
backendSettingFooter AS (
  SELECT 'Footer' AS name, id, "isReady"
  FROM public."backendSettingFooter"
  WHERE "isChanged" IS TRUE
),
backendSettingHeader AS (
  SELECT 'Header' AS name, id, "isReady"
  FROM public."backendSettingHeader"
  WHERE "isChanged" IS TRUE
),
backendSettingLink AS (
  SELECT 'Link' AS name, id, "isReady"
  FROM public."backendSettingLink"
  WHERE "isChanged" IS TRUE
),
backendSettingBrowser AS (
  SELECT 'Browser' AS name, id, "isReady"
  FROM public."backendSettingSite"
  WHERE "isChanged" IS TRUE
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
      `, { transaction: d.dbTransaction });

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
