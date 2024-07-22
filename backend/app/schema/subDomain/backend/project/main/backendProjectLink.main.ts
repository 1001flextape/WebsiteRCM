import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/linkMain/addOne.script";
import getOneById from "./scripts/linkMain/getOneById.script";
import getOneByProjectId from "./scripts/linkMain/getOneByProjectId.script";

export default function makeBackendProjectLinkMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}
