import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionLoudMain/addOne.script";
import getOneById from "./scripts/pageSectionLoudMain/getOneById.script";
import getOneByPageId from "./scripts/pageSectionLoudMain/getOneByPageId.script";

export default function makeBackendProjectPageSectionLoudMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
  }
}
