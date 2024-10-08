import { Model } from "sequelize";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import stringHelpers from "../../../../../../utils/stringHelpers";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { backendSiteDesignerDiscussionVoteEnum } from "../../../preMain/scripts/discussionVoteSql/_utils.private";
import makeBackendSiteDesignerDiscussionVoteSql from "../../../preMain/backendSiteDesignerDiscussionVote.sql";
import backendSiteDesignerDiscussionVote from "../../../../../../../models/backend/siteDesigner/discussion/backendSiteDesignerDiscussionVote.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  discussionId: string
  userId: string
  vote: backendSiteDesignerDiscussionVoteEnum
}

export default function getMyVote(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionVote> | null>> => {

    const discussionVoteSql = makeBackendSiteDesignerDiscussionVoteSql(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.userId) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_setMyVote_error:0001"
      })
    }

    const isIdStringFromUuid_userId = stringHelpers.isStringValidUuid({
      str: args.userId
    })

    if (!isIdStringFromUuid_userId.result) {
      return endMainFromError({
        hint: "Datapoint 'userId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_setMyVote_error:0001"
      })
    }

    if (!args.discussionId) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_setMyVote_error:0002"
      })
    }

    const isIdStringFromUuidDiscussionId = stringHelpers.isStringValidUuid({
      str: args.discussionId
    })

    if (!isIdStringFromUuidDiscussionId.result) {
      return endMainFromError({
        hint: "Datapoint 'discussionId' is not UUID format.",
        errorIdentifier: "backendSiteDesignerDiscussionVote_setMyVote_error:0002"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================

    const response = await discussionVoteSql.setMyVote({
      discussionId: args.discussionId,
      userId: args.userId,
      vote: args.vote,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response;
  }
}