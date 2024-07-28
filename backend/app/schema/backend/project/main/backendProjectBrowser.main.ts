import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/browserMain/addOne.script";
import getOneById from "./scripts/browserMain/getOneById.script";
import getOneByProjectId from "./scripts/browserMain/getOneByProjectId.script";

export default function makeBackendProjectBrowserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}