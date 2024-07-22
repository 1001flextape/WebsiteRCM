import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageBrowserSql/addOne.script";
import getOneById from "./scripts/pageBrowserSql/getOneById.script";
import getOneByPageId from "./scripts/pageBrowserSql/getOneByPageId.script";

export default function makeBackendProjectPageBrowserSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
  }
}