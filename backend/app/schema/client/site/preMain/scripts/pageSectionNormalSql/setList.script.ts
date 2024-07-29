import { SelectionTypeEnum } from "../../../../../../models/backend/setting/backendSettingHeader.model";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeSetList from "../../../../../utils/engine/setList.engine";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  id?: string;
  pageId?: string;
  selectionType?: SelectionTypeEnum;
  selectionId?: string;
  orderNumber?: number;
  userAnswersJsonB?: string;
  webAssetImport?: string;
};

export default function setList(d: dependencies) {
  const db = d.db.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList(d)

    const response = await setListEngine({
      setArray,
      dbEntity: db.clientSitePageSectionNormal,
      transaction: d.dbTransaction,
      currentDbArray: await db.clientSitePageSectionNormal.findAll({
        transaction: d.dbTransaction,
      })
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}