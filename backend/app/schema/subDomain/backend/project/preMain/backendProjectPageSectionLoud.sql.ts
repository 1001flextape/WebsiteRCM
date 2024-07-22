import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionLoudSql/addOne.script";
import getOneById from "./scripts/pageSectionLoudSql/getOneById.script";
import getOneByPageId from "./scripts/pageSectionLoudSql/getOneByPageId.script";

export default function makeBackendProjectPageSectionLoudSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
  }
}