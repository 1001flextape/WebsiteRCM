import { Model } from "sequelize";
import backendSiteDesignerDiscussionComment from "../../../../../../../models/backend/siteDesigner/discussion/backendSiteDesignerDiscussionComment.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  post: string
  userId: string
  discussionId: string
}

export default function addOne(d: dependencies) {

  const db = d.db.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSiteDesignerDiscussionComment> | null>> => {

    const data = await db.backendSiteDesignerDiscussionComment.create(
      args,
      {
        transaction: d.dbTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


