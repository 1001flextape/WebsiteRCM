import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/pageSectionNormalSql/getOneById.script";
import addOne from "./scripts/pageSectionNormalSql/addOne.script";
import addMany from "./scripts/pageSectionNormalSql/addMany.script";
import getManyByPageId from "./scripts/pageSectionNormalSql/getManyByPageId.script";
import getManyByProjectId from "./scripts/pageSectionNormalSql/getManyByProjectId.script";

export default function makeBackendProjectPageSectionNormalSql(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
    //testing:
    getManyByProjectId: getManyByProjectId(d),
  }
}