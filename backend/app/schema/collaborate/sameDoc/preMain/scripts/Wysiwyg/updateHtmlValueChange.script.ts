import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeWysiwygAdapter from "../../../forUsage/adapters/RealTimeWysiwygAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  htmlValue: string
}


export default function updateHtmlValueChange(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    // const user = await lookUp.getLookUpBySocketId({
    //   socketId: args.socketId,
    // })


    const prop = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeWysiwygAdapter

    if (prop.updateHtmlValue) {
      prop.updateHtmlValue(args.htmlValue)
    }

    // nothing to broadcast, keeping update for fresh load.

    return {
      success: true,
    }

  }
};
