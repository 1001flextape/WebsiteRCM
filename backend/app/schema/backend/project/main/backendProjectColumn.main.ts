import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/columnMain/getOneById.script";
import addOne from "./scripts/columnMain/addOne.script";
import getOneByProjectId from "./scripts/columnMain/getOneByProjectId.script";

export default function makeBackendProjectColumnMain(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}