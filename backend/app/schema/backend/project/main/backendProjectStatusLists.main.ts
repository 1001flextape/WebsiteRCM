import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getConfigurationChanged from "./scripts/statusLists/getConfigurationChanged.script"
import getConfigurationNotReady from "./scripts/statusLists/getConfigurationNotReady.script"
import getConfigurationReady from "./scripts/statusLists/getConfigurationReady.script"
import getManyDraftedPagesDeletedWithPagination from "./scripts/statusLists/getManyDraftedPagesDeletedWithPagination.script"
import getManyDraftedPagesNewWithPagination from "./scripts/statusLists/getManyDraftedPagesNewWithPagination.script"
import getManyDraftedPagesTotalWithPagination from "./scripts/statusLists/getManyDraftedPagesTotalWithPagination.script"
import getManyNewPagesDeletedWithPagination from "./scripts/statusLists/getManyNewPagesDeletedWithPagination.script"
import getManyNewPagesNewWithPagination from "./scripts/statusLists/getManyNewPagesNewWithPagination.script copy"
import getManyNewPagesNotReadyWithPagination from "./scripts/statusLists/getManyNewPagesNotReadyWithPagination.script"
import getManyNewPagesReadyWithPagination from "./scripts/statusLists/getManyNewPagesReadyWithPagination.script"
import getManyNewPagesTotalWithPagination from "./scripts/statusLists/getManyNewPagesTotalWithPagination.script"
import getManyPublishedPagesChangeWithPagination from "./scripts/statusLists/getManyPublishedPagesChangeWithPagination.script"
import getManyPublishedPagesDeletedWithPagination from "./scripts/statusLists/getManyPublishedPagesDeletedWithPagination.script"
import getManyPublishedPagesNotReadyWithPagination from "./scripts/statusLists/getManyPublishedPagesNotReadyWithPagination.script"
import getManyPublishedPagesReadyWithPagination from "./scripts/statusLists/getManyPublishedPagesReadyWithPagination.script"
import getManyPublishedPagesTotalWithPagination from "./scripts/statusLists/getManyPublishedPagesTotalWithPagination.script"

export default function makeBackendProjectStatusListMain(d: dependencies) {

  return {
    getManyDraftedPagesDeletedWithPagination: getManyDraftedPagesDeletedWithPagination(d),
    getManyDraftedPagesNewWithPagination: getManyDraftedPagesNewWithPagination(d),
    getManyDraftedPagesTotalWithPagination: getManyDraftedPagesTotalWithPagination(d),
    getManyNewPagesDeletedWithPagination: getManyNewPagesDeletedWithPagination(d),
    getManyNewPagesNewWithPagination: getManyNewPagesNewWithPagination(d),
    getManyNewPagesNotReadyWithPagination: getManyNewPagesNotReadyWithPagination(d),
    getManyNewPagesReadyWithPagination: getManyNewPagesReadyWithPagination(d),
    getManyNewPagesTotalWithPagination: getManyNewPagesTotalWithPagination(d),
    getManyPublishedPagesChangeWithPagination: getManyPublishedPagesChangeWithPagination(d),
    getManyPublishedPagesDeletedWithPagination: getManyPublishedPagesDeletedWithPagination(d),
    getManyPublishedPagesNotReadyWithPagination: getManyPublishedPagesNotReadyWithPagination(d),
    getManyPublishedPagesReadyWithPagination: getManyPublishedPagesReadyWithPagination(d),
    getManyPublishedPagesTotalWithPagination: getManyPublishedPagesTotalWithPagination(d),
    getConfigurationChanged: getConfigurationChanged(d),
    getConfigurationReady: getConfigurationReady(d),
    getConfigurationNotReady: getConfigurationNotReady(d),
  }
}