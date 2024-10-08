import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSiteDesignerDiscussionCommentVoteSql from "../../../preMain/backendSiteDesignerDiscussionCommentVote.sql";

type input = {
  commentId: string
}

export default function getTotalVote(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<number | null>> => {

    const commentVoteSql = makeBackendSiteDesignerDiscussionCommentVoteSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.commentId) {
      return endMainFromError({
        hint: "Datapoint 'commentId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getTotalVote_error:0001"
      })
    }

    const isIdStringFromUuid_commentId = stringHelpers.isStringValidUuid({
      str: args.commentId
    })

    if (!isIdStringFromUuid_commentId.result) {
      return endMainFromError({
        hint: "Datapoint 'commentId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionCommentVote_getTotalVote_error:0001"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await commentVoteSql.getTotalVote({
      commentId: args.commentId,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}