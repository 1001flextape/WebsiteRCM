import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/backgroundColorSql/addOne.script";
import getOneById from "./scripts/backgroundColorSql/getOneById.script";
import getOneByProjectId from "./scripts/backgroundColorSql/getOneByProjectId.script";

export default function makeBackendProjectBackgroundColorSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}