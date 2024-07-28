import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/fontMain/getOneById.script";
import addOne from "./scripts/fontMain/addOne.script";
import getOneByProjectId from "./scripts/fontMain/getOneByProjectId.script";

export default function makeBackendProjectFontMain(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}