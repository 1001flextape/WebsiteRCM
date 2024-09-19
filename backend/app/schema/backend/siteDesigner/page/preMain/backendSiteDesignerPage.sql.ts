import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageSql/addOne.script"
import deleteOne from "./scripts/pageSql/deleteOne.script"
import getManyWithPagination from "./scripts/pageSql/getManyWithPagination.script"
import getMany from "./scripts/pageSql/getMany.script"
import getOneById from "./scripts/pageSql/getOneById.script"
import updateOne from "./scripts/pageSql/updateOne.script"
import getOneBySlug from "./scripts/pageSql/getOneBySlug.script"
import resetRecentlyCreated from "./scripts/pageSql/resetRecentlyCreated.script"
import resetRecentlyDeleted from "./scripts/pageSql/resetRecentlyDeleted.script"
import getDeletedOneById from "./scripts/pageSql/getDeletedOneById.script"
import updateMany from "./scripts/pageSql/updateMany.script"
import getManyPublishable from "./scripts/pageSql/getManyPublishable.script"

export default function makeBackendSiteDesignerPageSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getManyPublishable: getManyPublishable(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
    updateOne: updateOne(d),
    updateMany: updateMany(d),
    getDeletedOneById: getDeletedOneById(d),
    resetRecentlyCreated: resetRecentlyCreated(d),
    resetRecentlyDeleted: resetRecentlyDeleted(d),
  }
}