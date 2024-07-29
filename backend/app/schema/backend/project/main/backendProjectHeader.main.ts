import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/headerMain/addOne.script";
import getOneById from "./scripts/headerMain/getOneById.script";
import getOneByProjectId from "./scripts/headerMain/getOneByProjectId.script";

export default function makeBackendProjectHeaderMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}
