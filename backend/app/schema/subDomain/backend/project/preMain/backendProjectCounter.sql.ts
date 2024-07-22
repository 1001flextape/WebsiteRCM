import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getConfigurationChangedCount from "./scripts/counters/getConfigurationChangedCount.script"
import getConfigurationNotReadyCount from "./scripts/counters/getConfigurationNotReadyCount.script"
import getConfigurationProgress from "./scripts/counters/getConfigurationProgress.script"
import getDraftedPagesDeletedCount from "./scripts/counters/getDraftedPagesDeletedCount.script"
import getDraftedPagesNewCount from "./scripts/counters/getDraftedPagesNewCount.script"
import getDraftedPagesTotalCount from "./scripts/counters/getDraftedPagesTotalCount.script"
import getNewPagesDeletedCount from "./scripts/counters/getNewPagesDeletedCount.script"
import getNewPagesNewCount from "./scripts/counters/getNewPagesNewCount.script"
import getNewPagesNotReadyCount from "./scripts/counters/getNewPagesNotReadyCount.script"
import getNewPagesProgress from "./scripts/counters/getNewPagesProgress.script"
import getNewPagesTotalCount from "./scripts/counters/getNewPagesTotalCount.script"
import getPublishedPagesChangedCount from "./scripts/counters/getPublishedPagesChangedCount.script"
import getPublishedPagesDeletedCount from "./scripts/counters/getPublishedPagesDeletedCount.script"
import getPublishedPagesNotReadyCount from "./scripts/counters/getPublishedPagesNotReadyCount.script"
import getPublishedPagesProgress from "./scripts/counters/getPublishedPagesProgress.script"
import getPublishedPagesTotalCount from "./scripts/counters/getPublishedPagesTotalCount.script"

export default function makeBackendProjectCountersSql(d: dependencies) {

  return {
    getConfigurationChangedCount: getConfigurationChangedCount(d),
    getConfigurationNotReadyCount: getConfigurationNotReadyCount(d),
    getConfigurationProgress: getConfigurationProgress(d),
    getDraftedPagesDeletedCount: getDraftedPagesDeletedCount(d),
    getDraftedPagesNewCount: getDraftedPagesNewCount(d),
    getDraftedPagesTotalCount: getDraftedPagesTotalCount(d),
    getNewPagesDeletedCount: getNewPagesDeletedCount(d),
    getNewPagesNewCount: getNewPagesNewCount(d),
    getNewPagesNotReadyCount: getNewPagesNotReadyCount(d),
    getNewPagesProgress: getNewPagesProgress(d),
    getNewPagesTotalCount: getNewPagesTotalCount(d),
    getPublishedPagesChangedCount: getPublishedPagesChangedCount(d),
    getPublishedPagesDeletedCount: getPublishedPagesDeletedCount(d),
    getPublishedPagesNotReadyCount: getPublishedPagesNotReadyCount(d),
    getPublishedPagesProgress: getPublishedPagesProgress(d),
    getPublishedPagesTotalCount: getPublishedPagesTotalCount(d),
  }
}