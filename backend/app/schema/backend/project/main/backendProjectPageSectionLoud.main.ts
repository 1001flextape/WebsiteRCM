import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionLoudMain/addOne.script";
import addMany from "./scripts/pageSectionLoudMain/addMany.script";
import getOneById from "./scripts/pageSectionLoudMain/getOneById.script";
import getOneByPageId from "./scripts/pageSectionLoudMain/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageSectionLoudMain/getManyByProjectId.script";

export default function makeBackendProjectPageSectionLoudMain(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
    //testing
    getManyByProjectId: getManyByProjectId(d),
  }
}
