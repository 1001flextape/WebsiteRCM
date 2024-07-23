import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getDraftedPagesNewCount from "./scripts/historicalCounter/getDraftedPagesNewCount.script"
import getDraftedPagesTotalCount from "./scripts/historicalCounter/getDraftedPagesTotalCount.script"
import getConfigurationCount from "./scripts/historicalCounter/getConfigurationCount.script"
import getDraftedPagesDeletedCount from "./scripts/historicalCounter/getDraftedPagesDeletedCount.script"
import getPublishedPagesChangedCount from "./scripts/historicalCounter/getPublishedPagesChangedCount.script"
import getPublishedPagesDeletedCount from "./scripts/historicalCounter/getPublishedPagesDeletedCount.script"
import getPublishedPagesNewCount from "./scripts/historicalCounter/getPublishedPagesNewCount.script"
import getPublishedPagesTotalCount from "./scripts/historicalCounter/getPublishedPagesTotalCount.script"

export default function makeBackendProjectHistoricalCounterSql(d: dependencies) {

  return {
    getConfigurationCount: getConfigurationCount(d),
    getDraftedPagesDeletedCount: getDraftedPagesDeletedCount(d),
    getDraftedPagesNewCount: getDraftedPagesNewCount(d),
    getDraftedPagesTotalCount: getDraftedPagesTotalCount(d),
    getPublishedPagesChangedCount: getPublishedPagesChangedCount(d),
    getPublishedPagesDeletedCount: getPublishedPagesDeletedCount(d),
    getPublishedPagesNewCount: getPublishedPagesNewCount(d),
    getPublishedPagesTotalCount: getPublishedPagesTotalCount(d),
  }
}