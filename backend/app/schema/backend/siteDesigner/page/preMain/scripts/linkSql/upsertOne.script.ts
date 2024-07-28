import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPageLink from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPageLink.model";

type input = {
  id?: string;
  pageId: string,
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<backendSiteDesignerPageLink> | null>> => {

    // bug fix
    if (args.id === null) {
      args.id = undefined
    }

    try {
      let instance = await db.backendSiteDesignerPageLink.findOne({
        where: {
          pageId: args.pageId,
        },
        transaction: d.dbTransaction,
      });

      if (!instance) {
        // If instance doesn't exist, create a new one
        [instance] = await db.backendSiteDesignerPageLink.findOrCreate({
          where: {
            pageId: args.pageId,
          },
          defaults: args,
          transaction: d.dbTransaction,
        });
      } else {
        // If instance exists, update the existing one
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      }

      return {
        success: true,
        data: instance,
      };
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "Error during upsert operation",
      };
    }
  };
}
