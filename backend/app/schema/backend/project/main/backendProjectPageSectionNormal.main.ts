import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionNormalMain/addOne.script";
import getOneById from "./scripts/pageSectionNormalMain/getOneById.script";
import getManyByPageId from "./scripts/pageSectionNormalMain/getManyByPageId.script";

export default function makeBackendProjectPageSectionNormalMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
  }
}
