import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import clientSitePageLink from "../../../../../../models/client/site/clientSitePageLink.model";

type input = {
  pageId: string,
  id?: string;
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function upsertOne(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<clientSitePageLink> | null>> => {

    // bug fix
    if (args.id === null) {
      args.id = undefined
    }

    try {
      let instance = await db.clientSitePageLink.findOne({
        where: {
          pageId: args.pageId,
        },
        transaction: d.dbTransaction,
      });

      if (!instance) {
        // If instance doesn't exist, create a new one
        [instance] = await db.clientSitePageLink.findOrCreate({
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
