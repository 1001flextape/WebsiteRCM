import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/footerMain/addOne.script";
import getOneById from "./scripts/footerMain/getOneById.script";
import getOneByProjectId from "./scripts/footerMain/getOneByProjectId.script";

export default function makeBackendProjectFooterMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}
