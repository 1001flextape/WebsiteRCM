import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";

type input = {
  channel: string,
  data: any
}

export default function broadCastToAllSockets(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    // Broadcasting. Send to every socket except the socket that requested it. 
    singleton.data.socketLookUp.map(lookUp => {
      lookUp.socket.emit(args.channel, args.data)
    })

    return {
      success: true,
    }
  }
}


