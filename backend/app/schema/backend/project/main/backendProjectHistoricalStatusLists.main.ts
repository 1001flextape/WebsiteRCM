import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getConfiguration from "./scripts/historicalStatusListsMain/getConfiguration.script"
import getManyDraftedPagesDeletedWithPagination from "./scripts/historicalStatusListsMain/getManyDraftedPagesDeletedWithPagination.script"
import getManyDraftedPagesNewWithPagination from "./scripts/historicalStatusListsMain/getManyDraftedPagesNewWithPagination.script"
import getManyDraftedPagesTotalWithPagination from "./scripts/historicalStatusListsMain/getManyDraftedPagesTotalWithPagination.script"
import getManyPublishedPagesChangeWithPagination from "./scripts/historicalStatusListsMain/getManyPublishedPagesChangeWithPagination.script"
import getManyPublishedPagesDeletedWithPagination from "./scripts/historicalStatusListsMain/getManyPublishedPagesDeletedWithPagination.script"
import getManyPublishedPagesNewWithPagination from "./scripts/historicalStatusListsMain/getManyPublishedPagesNewWithPagination.script"
import getManyPublishedPagesTotalWithPagination from "./scripts/historicalStatusListsMain/getManyPublishedPagesTotalWithPagination.script"

export default function makeBackendProjectHistoricalStatusListsMain(d: dependencies) {

  return {
    getConfiguration: getConfiguration(d),
    getManyDraftedPagesDeletedWithPagination: getManyDraftedPagesDeletedWithPagination(d),
    getManyDraftedPagesNewWithPagination: getManyDraftedPagesNewWithPagination(d),
    getManyDraftedPagesTotalWithPagination:getManyDraftedPagesTotalWithPagination(d),
    getManyPublishedPagesChangeWithPagination: getManyPublishedPagesChangeWithPagination(d),
    getManyPublishedPagesDeletedWithPagination: getManyPublishedPagesDeletedWithPagination(d),
    getManyPublishedPagesNewWithPagination: getManyPublishedPagesNewWithPagination(d),
    getManyPublishedPagesTotalWithPagination: getManyPublishedPagesTotalWithPagination(d),

  }
}