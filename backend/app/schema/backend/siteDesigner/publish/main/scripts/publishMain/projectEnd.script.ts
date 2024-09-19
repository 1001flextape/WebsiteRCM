import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendProjectMain from "../../../../../project/main/backendProject.main";

export default function endProject(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
        const backendProject = makeBackendProjectMain(d)

        await backendProject.updateCurrentOne({
            endedAt: new Date(),
        })

      return {
        success: true,
      }

    } catch (ex) {
      return endMainFromError({
        errorIdentifier: "backendSiteDesignerPublish_publishSite_error:0000",
        hint: "Error during website publish."
      })
    }
  }
}