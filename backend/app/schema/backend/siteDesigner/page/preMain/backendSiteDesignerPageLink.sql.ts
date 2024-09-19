import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import upsertOne from "./scripts/linkSql/upsertOne.script"
import getOneByPageId from "./scripts/linkSql/getOneByPageId.script"
import getMany from "./scripts/linkSql/getMany.script"
import getManyPublishable from "./scripts/linkSql/getManyPublishable.script"

export default function makeBackendSiteDesignerPageLinkSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getManyPublishable: getManyPublishable(d),
    upsertOne: upsertOne(d),
    getMany: getMany(d),
  }
}