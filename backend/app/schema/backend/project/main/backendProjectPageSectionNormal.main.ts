import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionNormalMain/addOne.script";
import addMany from "./scripts/pageSectionNormalMain/addMany.script";
import getOneById from "./scripts/pageSectionNormalMain/getOneById.script";
import getManyByPageId from "./scripts/pageSectionNormalMain/getManyByPageId.script";
import getManyByProjectId from "./scripts/pageSectionNormalMain/getManyByProjectId.script";

export default function makeBackendProjectPageSectionNormalMain(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
    //testing
    getManyByProjectId: getManyByProjectId(d),
  }
}
