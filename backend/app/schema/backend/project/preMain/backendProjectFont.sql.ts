import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/fontSql/getOneById.script";
import addOne from "./scripts/fontSql/addOne.script";
import getOneByProjectId from "./scripts/fontSql/getOneByProjectId.script";

export default function makeBackendProjectFontSql(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}