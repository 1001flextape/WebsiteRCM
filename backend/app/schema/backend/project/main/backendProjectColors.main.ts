import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/colorsMain/addOne.script";
import getOneById from "./scripts/colorsMain/getOneById.script";
import getOneByProjectId from "./scripts/colorsMain/getOneByProjectId.script";

export default function makeBackendProjectColorsMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}