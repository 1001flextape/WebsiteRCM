import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import upsertOne from "./scripts/browserSql/upsertOne.script"
import getOneByPageId from "./scripts/browserSql/getOneByPageId.script"
import getMany from "./scripts/browserSql/getMany.script"
import getManyPublishable from "./scripts/browserSql/getManyPublishable.script"

export default function makeBackendSiteDesignerPageBrowserSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getManyPublishable: getManyPublishable(d),
    upsertOne: upsertOne(d),
    getMany: getMany(d),
  }
}