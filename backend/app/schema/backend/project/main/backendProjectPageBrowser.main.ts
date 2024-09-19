import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageBrowserMain/addOne.script";
import addMany from "./scripts/pageBrowserMain/addMany.script";
import getOneById from "./scripts/pageBrowserMain/getOneById.script";
import getOneByPageId from "./scripts/pageBrowserMain/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageBrowserMain/getManyByProjectId.script";

export default function makeBackendProjectPageBrowserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
    //testing
    getManyByProjectId: getManyByProjectId(d),
  }
}