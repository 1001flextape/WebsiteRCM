import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/browserSql/getOneById.script";
import addOne from "./scripts/browserSql/addOne.script";
import getOneByProjectId from "./scripts/browserSql/getOneByProjectId.script";

export default function makeBackendProjectBrowserSql(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}