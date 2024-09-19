import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendProjectMain from "../../../../../project/main/backendProject.main";
import getRandomColor from "../../../../../../utils/helpers/getRandomColor";
import getProjectName from "../../../../../../utils/helpers/getProjectName";

export default function startNewProject(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      //import
      const backendProject = makeBackendProjectMain(d)

      await backendProject.addOne({
        startedAt: new Date(),
        name: getProjectName(),
        color: getRandomColor(),
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