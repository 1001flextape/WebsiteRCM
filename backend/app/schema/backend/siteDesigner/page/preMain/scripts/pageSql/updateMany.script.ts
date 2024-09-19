import { Model, UpdateOptions } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSiteDesignerPage, { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type Input = {
  where?: { [key: string]: any }, // where condition to filter the records
  paranoid?: boolean,
  isReady?: boolean,
  slug?: string,
  status?: PageStatusEnum,
  isChanged?: boolean,
  isRecentlyCreated?: boolean,
  isRecentlyDeleted?: boolean,
}

export default function updateMany(d: dependencies) {
  const db = d.db.models;

  return async ({ where = {}, paranoid = true, ...args }: Input): Promise<returningSuccessObj<Model<backendSiteDesignerPage>[] | null>> => {

    // Constructing the options for the update
    let options: UpdateOptions = {
      where,                    // Default to an empty object if no `where` is provided
      returning: true,           // Return the updated records
      transaction: d.dbTransaction,
      paranoid,                  // Handling soft delete records
    };

    try {
      // Perform the update using Sequelize's `update` method
      const [affectedRows, updatedRecords] = await db.backendSiteDesignerPage.update(args, options) as any;

      // Check if no records were affected
      if (affectedRows === 0) {
        return {
          success: false,
          humanMessage: "No records were updated.",
          data: null,
        };
      }

      return {
        success: true,
        data: updatedRecords || null,  // Return the updated records or null if not applicable
      };

    } catch (error) {
      // Handle any errors that occur during the update operation
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        humanMessage: "An error occurred during the update operation.",
        data: null,
      };
    }
  };
}
