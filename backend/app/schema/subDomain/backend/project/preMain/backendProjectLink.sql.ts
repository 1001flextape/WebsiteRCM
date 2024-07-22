import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/linkSql/addOne.script";
import getOneById from "./scripts/linkSql/getOneById.script";
import getOneByProjectId from "./scripts/linkSql/getOneByProjectId.script";

export default function makeBackendProjectLinkSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}