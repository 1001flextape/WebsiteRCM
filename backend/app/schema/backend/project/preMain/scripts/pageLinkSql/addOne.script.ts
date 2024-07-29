import { Model } from "sequelize";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import backendProjectPageLink from "../../../../../../models/backend/project/backendProjectPageLink.model";

type input = {
  projectId: string;
  pageId: string;
  
  id?: string;
  title?: string;
  description?: string;
  picture?: string;
  pictureAlt?: string;
};

export default function addOne(d: dependencies) {
  const db = d.db.models;

  return async (
    args: input
  ): Promise<returningSuccessObj<Model<backendProjectPageLink> | null>> => {

    // bug fix
    if (args.id === null) {
      args.id = undefined;
    }

    try {
      // Find the existing record by projectId and pageId
      let instance = await db.backendProjectPageLink.findOne({
        where: { projectId: args.projectId, pageId: args.pageId },
        transaction: d.dbTransaction,
      });

      if (instance) {
        // Update the existing record
        instance = await instance.update(args, {
          transaction: d.dbTransaction,
        });
      } else {
        // Create a new record
        instance = await db.backendProjectPageLink.create(args, {
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
        humanMessage: "Error during creation operation",
      };
    }
  };
}
