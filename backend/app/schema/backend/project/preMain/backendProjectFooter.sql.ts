import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/footerSql/addOne.script";
import getOneById from "./scripts/footerSql/getOneById.script";
import getOneByProjectId from "./scripts/footerSql/getOneByProjectId.script";

export default function makeBackendProjectFooterSql(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}