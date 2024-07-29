import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/colorsSql/addOne.script";
import getOneById from "./scripts/colorsSql/getOneById.script";
import getOneByProjectId from "./scripts/colorsSql/getOneByProjectId.script";

export default function makeBackendProjectColorsSql(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}