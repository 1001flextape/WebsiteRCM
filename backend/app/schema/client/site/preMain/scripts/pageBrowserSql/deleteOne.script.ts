import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";

type Input = {
  id: string;
};

export default function deleteOne(d: dependencies) {
  
  const db = d.db.models;

  return async (args: Input): Promise<returningSuccessObj<null>> => {
    const { id } = args;

    try {
      const instance = await db.clientSitePageBrowser.findByPk(id, {
        transaction: d.dbTransaction,
      });

      if (instance) {
        await instance.destroy({ transaction: d.dbTransaction });

        return {
          success: true,
          data: null, // No data to return after deletion
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (error) {
      d.errorHandler(error, d.loggers);
      return {
        success: false,
        data: null,
      };
    }
  };
}
