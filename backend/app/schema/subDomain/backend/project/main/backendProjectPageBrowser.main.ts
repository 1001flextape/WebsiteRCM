import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageBrowserMain/addOne.script";
import getOneById from "./scripts/pageBrowserMain/getOneById.script";
import getOneByPageId from "./scripts/pageBrowserMain/getOneByPageId.script";

export default function makeBackendProjectPageBrowserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
  }
}