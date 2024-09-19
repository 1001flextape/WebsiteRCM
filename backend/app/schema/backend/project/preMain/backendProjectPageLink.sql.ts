import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageLinkSql/addOne.script";
import getOneById from "./scripts/pageLinkSql/getOneById.script";
import getOneByPageId from "./scripts/pageLinkSql/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageLinkSql/getManyByProjectId.script";
import addMany from "./scripts/pageLinkSql/addMany.script";

export default function makeBackendProjectPageLinkSql(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
    //testing:
    getManyByProjectId: getManyByProjectId(d),
  }
}