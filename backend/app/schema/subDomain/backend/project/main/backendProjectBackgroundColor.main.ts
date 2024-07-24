import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/backgroundColorMain/addOne.script";
import getOneById from "./scripts/backgroundColorMain/getOneById.script";
import getOneByProjectId from "./scripts/backgroundColorMain/getOneByProjectId.script";

export default function makeBackendProjectBackgroundColorMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}