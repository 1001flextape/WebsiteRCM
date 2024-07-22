import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageLinkMain/addOne.script";
import getOneById from "./scripts/pageLinkMain/getOneById.script";
import getOneByPageId from "./scripts/pageLinkMain/getOneByPageId.script";

export default function makeBackendProjectPageLinkMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
  }
}