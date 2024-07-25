import { Model } from "sequelize";
import makeBackendProjectSql from "../../../preMain/backendProject.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendProject from "../../../../../../../models/subDomain/backend/project/backendProject.model";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import makeBackendProjectCountersSql from "../../../preMain/backendProjectCounter.sql";



type output = {
  id?: string;
  name?: string;
  color?: string;
  startedAt?: Date;

  // # Configuration
  getConfigurationChangedCount?: number,
  getConfigurationNotReadyCount?: number,
  getConfigurationProgress?: number,

  // # Draft Pages
  getDraftedPagesDeletedCount?: number,
  getDraftedPagesNewCount?: number,
  getDraftedPagesTotalCount?: number,

  // # New Pages
  getNewPagesDeletedCount?: number,
  getNewPagesNewCount?: number,
  getNewPagesNotReadyCount?: number,
  getNewPagesProgress?: number,
  getNewPagesTotalCount?: number,

  // # published Pages
  getPublishedPagesChangedCount?: number,
  getPublishedPagesDeletedCount?: number,
  getPublishedPagesNotReadyCount?: number,
  getPublishedPagesProgress?: number,
  getPublishedPagesTotalCount?: number,
}

export default function getCurrentSummary(d: dependencies) {

  return async (): Promise<returningSuccessObj<output>> => {

    const projectSql = makeBackendProjectSql(d);
    const counterSql = makeBackendProjectCountersSql(d);

    //////////////////////////////////////
    // Sql
    // ===================================

    const currentProject = await projectSql.getCurrentProject()

    // # Configuration
    const getConfigurationChangedCount = await counterSql.getConfigurationChangedCount()
    const getConfigurationNotReadyCount = await counterSql.getConfigurationNotReadyCount()
    const getConfigurationProgress = await counterSql.getConfigurationProgress()

    // # Draft Pages
    const getDraftedPagesDeletedCount = await counterSql.getDraftedPagesDeletedCount()
    const getDraftedPagesNewCount = await counterSql.getDraftedPagesNewCount()
    const getDraftedPagesTotalCount = await counterSql.getDraftedPagesTotalCount()

    // # New Pages
    const getNewPagesDeletedCount = await counterSql.getNewPagesDeletedCount()
    const getNewPagesNewCount = await counterSql.getNewPagesNewCount()
    const getNewPagesNotReadyCount = await counterSql.getNewPagesNotReadyCount()
    const getNewPagesProgress = await counterSql.getNewPagesProgress()
    const getNewPagesTotalCount = await counterSql.getNewPagesTotalCount()

    // # published Pages
    const getPublishedPagesChangedCount = await counterSql.getPublishedPagesChangedCount()
    const getPublishedPagesDeletedCount = await counterSql.getPublishedPagesDeletedCount()
    const getPublishedPagesNotReadyCount = await counterSql.getPublishedPagesNotReadyCount()
    const getPublishedPagesProgress = await counterSql.getPublishedPagesProgress()
    const getPublishedPagesTotalCount = await counterSql.getPublishedPagesTotalCount()





    return {
      success: true,
      data: {
        id: currentProject?.data?.dataValues?.id,
        name: currentProject?.data?.dataValues?.name,
        color: currentProject?.data?.dataValues?.color,
        startedAt: currentProject?.data?.dataValues?.startedAt,

        // # Configuration
        getConfigurationChangedCount: getConfigurationChangedCount?.data || 0,
        getConfigurationNotReadyCount: getConfigurationNotReadyCount?.data || 0,
        getConfigurationProgress: getConfigurationProgress?.data || 0,

        // # Draft Pages
        getDraftedPagesDeletedCount: getDraftedPagesDeletedCount?.data || 0,
        getDraftedPagesNewCount: getDraftedPagesNewCount?.data || 0,
        getDraftedPagesTotalCount: getDraftedPagesTotalCount?.data || 0,

        // # New Pages
        getNewPagesDeletedCount: getNewPagesDeletedCount?.data || 0,
        getNewPagesNewCount: getNewPagesNewCount?.data || 0,
        getNewPagesNotReadyCount: getNewPagesNotReadyCount?.data || 0,
        getNewPagesProgress: getNewPagesProgress?.data || 0,
        getNewPagesTotalCount: getNewPagesTotalCount?.data || 0,

        // # published Pages
        getPublishedPagesChangedCount: getPublishedPagesChangedCount?.data || 0,
        getPublishedPagesDeletedCount: getPublishedPagesDeletedCount?.data || 0,
        getPublishedPagesNotReadyCount: getPublishedPagesNotReadyCount?.data || 0,
        getPublishedPagesProgress: getPublishedPagesProgress?.data || 0,
        getPublishedPagesTotalCount: getPublishedPagesTotalCount?.data || 0,
      }
    };

    // .catch(error => d.errorHandler(error, d.loggers))
  }
}
