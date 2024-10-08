import { and, or } from "graphql-shield"
import { isAuthenticated, isAdmin, isPublic, hasPermissions } from "../../../../../shield/rules"

export default {
  Query: {
    backendSiteDesignerPage_doesHomePageExist: isAuthenticated,
    // backendSiteDesignerPage_getOneById: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesignerPage_getOneById: isAuthenticated,
    backendSiteDesignerPage_getOneBySlug: isAuthenticated,
    backendSiteDesignerPage_getOneRealTimeById: isAuthenticated,
    // backendSiteDesignerPage_getManyWithPagination: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-read']))),
    backendSiteDesignerPage_getManyWithPagination: isAuthenticated,

    // browser
    backendSiteDesignerPageBrowser_getOneByPageId: isAuthenticated,
    backendSiteDesignerPageBrowser_getOneRealTimeByPageId: isAuthenticated,

    // link
    backendSiteDesignerPageLink_getOneByPageId: isAuthenticated,
    backendSiteDesignerPageLink_getOneRealTimeByPageId: isAuthenticated,

    // sections
    backendSiteDesignerPageSectionLoud_getOneByPageId: isAuthenticated,
    backendSiteDesignerPageSectionLoud_getOneRealTimeByPageId: isAuthenticated,

    backendSiteDesignerPageSectionNormal_getManyByPageId: isAuthenticated,
    backendSiteDesignerPageSectionNormal_getOneById: isAuthenticated,
    backendSiteDesignerPageSectionNormal_getOneRealTimeById: isAuthenticated,

    // built-in
    backendSiteDesignerPageSectionLoudBuiltIn_getMany: isAuthenticated,
    backendSiteDesignerPageSectionNormalBuiltIn_getMany: isAuthenticated,

  },
  Mutation: {
    // backendSiteDesignerPage_addOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_addOne: isAuthenticated,
    // backendSiteDesignerPage_updateOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_updateOne: isAuthenticated,
    backendSiteDesignerPage_updateOneFromUI: isAuthenticated,
    // backendSiteDesignerPage_deleteOne: and(isAuthenticated, or(isAdmin, hasPermissions(['backend-siteDesigner-update']))),
    backendSiteDesignerPage_deleteOne: isAuthenticated,

    backendSiteDesignerPageBrowser_upsertOne: isAuthenticated,

    backendSiteDesignerPageLink_upsertOne: isAuthenticated,

    // sections
    backendSiteDesignerPageSectionLoud_upsertOne: isAuthenticated,
    backendSiteDesignerPageSectionLoud_deleteOne: isAuthenticated,

    backendSiteDesignerPageSectionNormal_addOne: isAuthenticated,
    backendSiteDesignerPageSectionNormal_updateOne: isAuthenticated,
    backendSiteDesignerPageSectionNormal_deleteOne: isAuthenticated,
  }
}