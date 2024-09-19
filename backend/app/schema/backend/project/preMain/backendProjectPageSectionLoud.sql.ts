import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionLoudSql/addOne.script";
import addMany from "./scripts/pageSectionLoudSql/addMany.script";
import getOneById from "./scripts/pageSectionLoudSql/getOneById.script";
import getOneByPageId from "./scripts/pageSectionLoudSql/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageSectionLoudSql/getManyByProjectId.script";

export default function makeBackendProjectPageSectionLoudSql(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
    //testing:
    getManyByProjectId: getManyByProjectId(d),
  }
}