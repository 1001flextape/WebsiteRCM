import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type Input = {
  pageId: string;
  id?: string;
  webAssetImport?: string;
  userAnswersJsonB?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
};

export default function setList(d: dependencies) {
  const db = d.db.models;

  return async (setArray: Input[]): Promise<returningSuccessObj<null>> => {
    try {
      // 1) Fetch all existing records for the given pageId
      const existingRecords = await db.clientSitePageSectionLoud.findAll({
        transaction: d.dbTransaction,
      });

      if (!existingRecords) {
        return { success: false, data: null };
      }

      const usedRecordIds: string[] = [];

      // 2) Iterate over setArray to update or create records
      for (const item of setArray) {
        if (item.id) {
          // 2b) Update existing record if it has an id
          await db.clientSitePageSectionLoud.update(
            {
              webAssetImport: item.webAssetImport,
              userAnswersJsonB: item.userAnswersJsonB,
              selectionType: item.selectionType,
              selectionId: item.selectionId,
            },
            {
              where: { id: item.id },
              transaction: d.dbTransaction,
            }
          );
          usedRecordIds.push(item.id);
        } else {
          // 2a) Create new record if it doesn't have an id
          const newRecord = await db.clientSitePageSectionLoud.create(
            {
              pageId: item.pageId,
              webAssetImport: item.webAssetImport,
              userAnswersJsonB: item.userAnswersJsonB,
              selectionType: item.selectionType,
              selectionId: item.selectionId,
            },
            {
              transaction: d.dbTransaction,
            }
          );
          if (newRecord) usedRecordIds.push(newRecord.dataValues.id);
        }
      }

      // 3) Delete records that were not in the setArray
      const recordsToDelete = existingRecords.filter(
        record => !usedRecordIds.includes(record.dataValues.id)
      );

      for (const record of recordsToDelete) {
        await record.destroy({ transaction: d.dbTransaction });
      }

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "An error occurred during the operation.",
        data: null,
      };
    }
  };
}
