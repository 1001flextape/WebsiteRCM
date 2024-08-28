import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSocketLookUp from "../../../../_singleton/preMain/socketLookUp.ram-cache";
import RealTimeWysiwygAdapter from "../../../forUsage/adapters/RealTimeWysiwygAdapter";
import makeCollaborateSameDoc from "../../collaborateSameDoc.ram-cache";


type input = {
  entity: string,
  name: string,
  ydoc: any,
  socketId: string
}

export default function updateYdocChange(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const sameDocEntity = makeCollaborateSameDoc(d)
    const socketLookUp = makeSocketLookUp(d)

    const prop = (await sameDocEntity.getByPropertyName({
      entity: args.entity,
      name: args.name,
    })).data as RealTimeWysiwygAdapter

    const data = {
      order: undefined,
      entity: args.entity,
      name: args.name,
      ydoc: args.ydoc,
    }

    try {
      data.order = await prop.applyYdocUpdate(args.ydoc)

      const userSocket = await socketLookUp.getLookUpBySocketId({
        socketId: args.socketId
      })

      // This user has edit the feed.
      prop.updateUsersWhoChangeValue(userSocket.data)

      let user = { ...userSocket.data }

      delete user.socket;
      delete user.socketId;
      delete user.pathname;
      delete user.entities;

      await sameDocEntity.broadcast({
        data: {
          entity: args.entity,
          name: args.name,
          user,
        },
        entity: args.entity,
        socketId: args.socketId,
        socketChannel: 'samedoc-wysiwyg-userChangeInput-update',
      })

    }
    catch (ex) {
      return {
        success: false,
      }
    }

    await sameDocEntity.broadcast({
      data,
      entity: args.entity,
      socketId: args.socketId,
      socketChannel: 'samedoc-wysiwyg-update',
    })



    return {
      success: true,
    }
  }
}

