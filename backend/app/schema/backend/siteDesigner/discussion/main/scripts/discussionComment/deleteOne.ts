import { Model } from "sequelize";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionCommentSql from "../../../preMain/backendSiteDesignerDiscussionComment.sql";
import backendSiteDesignerDiscussionComment from "../../../../../../../models/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function deleteOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionComment> | null>> => {

    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.id) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_deleteOne_error:0001"
      })
    }

    const isIdStringFromUuid = stringHelpers.isStringValidUuid({
      str: args.id
    })
    
    if (!isIdStringFromUuid.result) {
      return endMainFromError({
        hint: "Datapoint 'id' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionComment_deleteOne_error:0001"
      })
    }


    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionCommentSql.deleteOne({
      id: args.id
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}