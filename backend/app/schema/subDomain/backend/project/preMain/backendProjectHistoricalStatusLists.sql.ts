import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getConfiguration from "./scripts/historicalStatusLists/getConfiguration.script"
import getManyDraftedPagesDeletedWithPagination from "./scripts/historicalStatusLists/getManyDraftedPagesDeletedWithPagination.script"
import getManyDraftedPagesNewWithPagination from "./scripts/historicalStatusLists/getManyDraftedPagesNewWithPagination.script"
import getManyDraftedPagesTotalWithPagination from "./scripts/historicalStatusLists/getManyDraftedPagesTotalWithPagination.script"
import getManyPublishedPagesChangeWithPagination from "./scripts/historicalStatusLists/getManyPublishedPagesChangeWithPagination.script"
import getManyPublishedPagesDeletedWithPagination from "./scripts/historicalStatusLists/getManyPublishedPagesDeletedWithPagination.script"
import getManyPublishedPagesNewWithPagination from "./scripts/historicalStatusLists/getManyPublishedPagesNewWithPagination.script"
import getManyPublishedPagesTotalWithPagination from "./scripts/historicalStatusLists/getManyPublishedPagesTotalWithPagination.script"

export default function makeBackendProjectHistoricalCounterSql(d: dependencies) {

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