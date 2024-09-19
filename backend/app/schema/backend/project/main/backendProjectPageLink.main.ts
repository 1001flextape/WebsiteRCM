import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageLinkMain/addOne.script";
import addMany from "./scripts/pageLinkMain/addMany.script";
import getOneById from "./scripts/pageLinkMain/getOneById.script";
import getOneByPageId from "./scripts/pageLinkMain/getOneByPageId.script";
import getManyByProjectId from "./scripts/pageLinkMain/getManyByProjectId.script";

export default function makeBackendProjectPageLinkMain(d: dependencies) {

  return {
    addOne: addOne(d),
    addMany: addMany(d),
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
    //testing
    getManyByProjectId: getManyByProjectId(d),
  }
}