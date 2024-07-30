import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeSelectAdapter from "../../../forUsage/adapters/RealTimeSelectAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";

type input = {
  socketId: string
  entity: string
  name: string
  value: string
}


export default function updateSelectChange(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const lookUp = makeSocketLookUp(d)

    const user = await lookUp.getLookUpBySocketId({
      socketId: args.socketId,
    })


    const prop: RealTimeSelectAdapter = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeSelectAdapter

    if (prop) {
      const orderNumber = await prop.updateSelect({
        value: args.value,
        socketLookUp: user.data,
      })

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          order: orderNumber,
          value: args.value,
          user: {
            picture: user.data.picture,
            displayName: user.data.displayName,
            labelColor: user.data.labelColor,
            circleColor: user.data.circleColor,
          }
        },
        entity: args.entity,
        socketChannel: 'samedoc-select-change',
        socketId: args.socketId,
        socketBufferChannel: 'samedoc-buffer-select-change'
      })
    }

    return {
      success: true,
    }

  }
};
