import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageBrowserSql/addOne.script";
import addMany from "./scripts/pageBrowserSql/addMany.script";
import getOneById from "./scripts/pageBrowserSql/getOneById.script";
import getOneByPageId from "./scripts/pageBrowserSql/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageBrowserSql/getManyByProjectId.script";

export default function makeBackendProjectPageBrowserSql(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
    //testing:
    getManyByProjectId: getManyByProjectId(d),
  }
}