import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOneByPageId from "./scripts/linkMain/getOneByPageId.script"
import getMany from "./scripts/linkMain/getMany.script"
import getOneRealTimeByPageId from "./scripts/linkMain/getOneRealTimeByPageId.script"
import upsertOne from "./scripts/linkMain/upsertOne.script"
import getManyPublishable from "./scripts/linkMain/getManyPublishable.script"

export default function makeBackendSiteDesignerPageLinkMain(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getMany: getMany(d),
    getManyPublishable: getManyPublishable(d),
    getOneRealTimeByPageId: getOneRealTimeByPageId(d),
    upsertOne: upsertOne(d),
  }
}