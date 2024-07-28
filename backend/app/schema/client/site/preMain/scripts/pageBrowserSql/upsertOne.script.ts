import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageBrowser from "../../../../../../models/client/site/clientSitePageBrowser.model";

type input = {
  pageId: string;
  id?: string;
  tabName?: string;
};

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<clientSitePageBrowser> | null>> => {
    try {
      let instance = await db.clientSitePageBrowser.findOne({
        where: {
          pageId: args.pageId,
        },
        transaction: d.dbTransaction,
      });

      if (!instance) {
        // If instance doesn't exist, create a new one
        [instance] = await db.clientSitePageBrowser.findOrCreate({
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
