import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeTransferToClient from "./transferToClient.script";
import makeTransferToProject from "./transferToProject.script";
import makeResetSettingsChanges from "./resetSettingsChanges.script";
import makeResetPages from "./resetPages.script";
import makeEndProject from "./projectEnd.script";
import makeStartNewProject from "./projectStartNew.script";

export default function publishSite(d: dependencies) {
  return async (): Promise<returningSuccessObj<null>> => {

    try {
      const transferToClient = makeTransferToClient(d)
      const transferToProject = makeTransferToProject(d)
      const resetSettingsChanges = makeResetSettingsChanges(d)
      const resetPages = makeResetPages(d)
      const endProject = makeEndProject(d)
      const startNewProject = makeStartNewProject(d)


      // transfer to main site and a copy for the warehouse
      await transferToClient()
      await transferToProject()

      // reset for new project
      await resetSettingsChanges()
      await resetPages()

      // end this project
      await endProject()
      // start new project
      await startNewProject()

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