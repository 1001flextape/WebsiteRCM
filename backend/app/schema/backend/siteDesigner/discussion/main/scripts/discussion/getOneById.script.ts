import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionSql from "../../../preMain/backendSiteDesignerDiscussion.sql";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import backendSiteDesignerDiscussion from "../../../../../../../models/backend/siteDesigner/discussion/backendSiteDesignerDiscussion.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOneById(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussion> | null>> => {

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d);
    
    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_getOneById_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussion_getOneById_error:0001"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================
    
    const response = await discussionSql.getOneById({
      id: args.id,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}