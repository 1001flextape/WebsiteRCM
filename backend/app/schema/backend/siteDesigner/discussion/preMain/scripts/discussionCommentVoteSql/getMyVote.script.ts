import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendSiteDesignerDiscussionCommentVote from "../../../../../../../models/backend/siteDesigner/discussion/backendSiteDesignerDiscussionCommentVote.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  commentId: string,
  userId: string,
}

export default function getMyVote(d: dependencies) {

  const db = d.db.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionCommentVote> | null>> => {

    const data: Model<backendSiteDesignerDiscussionCommentVote> = await db.backendSiteDesignerDiscussionCommentVote.findOne({
      where,
      transaction: d.dbTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}