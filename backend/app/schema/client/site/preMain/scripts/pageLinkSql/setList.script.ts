import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import makeSetList from "../../../../../utils/engine/setList.engine";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type input = {
  pageId: string,
  id?: string;
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function setList(d: dependencies) {
  const db = d.db.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList(d)

    const response = await setListEngine({
      setArray,
      dbEntity: db.clientSitePageLink,
      transaction: d.dbTransaction,
      currentDbArray: await db.clientSitePageLink.findAll({
        transaction: d.dbTransaction,
      })
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}