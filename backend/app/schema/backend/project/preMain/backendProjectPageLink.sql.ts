import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageLinkSql/addOne.script";
import getOneById from "./scripts/pageLinkSql/getOneById.script";
import getOneByPageId from "./scripts/pageLinkSql/getOneByPageId.script";

export default function makeBackendProjectPageLinkSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
  }
}