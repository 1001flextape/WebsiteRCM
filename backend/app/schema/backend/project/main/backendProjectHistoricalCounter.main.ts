import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getDraftedPagesNewCount from "./scripts/historicalCounterMain/getDraftedPagesNewCount.script"
import getDraftedPagesTotalCount from "./scripts/historicalCounterMain/getDraftedPagesTotalCount.script"
import getConfigurationCount from "./scripts/historicalCounterMain/getConfigurationCount.script"
import getDraftedPagesDeletedCount from "./scripts/historicalCounterMain/getDraftedPagesDeletedCount.script"
import getPublishedPagesChangedCount from "./scripts/historicalCounterMain/getPublishedPagesChangedCount.script"
import getPublishedPagesDeletedCount from "./scripts/historicalCounterMain/getPublishedPagesDeletedCount.script"
import getPublishedPagesNewCount from "./scripts/historicalCounterMain/getPublishedPagesNewCount.script"
import getPublishedPagesTotalCount from "./scripts/historicalCounterMain/getPublishedPagesTotalCount.script"

export default function makeBackendProjectHistoricalCounterMain(d: dependencies) {

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