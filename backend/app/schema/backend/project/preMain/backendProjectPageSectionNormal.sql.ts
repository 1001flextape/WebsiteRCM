import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/pageSectionNormalSql/getOneById.script";
import addOne from "./scripts/pageSectionNormalSql/addOne.script";
import getManyByPageId from "./scripts/pageSectionNormalSql/getManyByPageId.script";

export default function makeBackendProjectPageSectionNormalSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
  }
}