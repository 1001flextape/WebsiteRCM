import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDoc from "../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import RealTimeColorSelectionAdapter from "../../../../collaborate/sameDoc/forUsage/adapters/RealTimeColorSelectionAdapter";
import { EntityDocument } from "../../../../collaborate/sameDoc/forUsage/types/RealTimeEntity";
import makeSocketLookUp from "../../../../collaborate/_singleton/preMain/socketLookUp.ram-cache";
import { socketLookUpType } from "../../../../collaborate/_singleton/preMain/scripts/socketLookUp/socketRecord.types";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-setting-background-change-prop', async (data) => {

    const entity = 'backendSettingBackgroundColor'

    const sameDoc = makeCollaborateSameDoc(d)

    const lookUp = makeSocketLookUp(d);

    const record = (await sameDoc.getByEntity({
      entity,
    })).data as EntityDocument

    const prop = (await sameDoc.getByPropertyName({
      entity,
      name: data.name,
    })).data as RealTimeColorSelectionAdapter

    const socketLookUp = (await lookUp.getLookUpBySocketId({
      socketId: socket.id
    })).data as socketLookUpType

    if (prop) {
      prop.updateColor({
        suggestedTextColor: data.suggestedTextColor,
        color: data.color,
        socketLookUp,
      })
    }

    if (record.sockets) {
      record.sockets.map(s => {
        s.socket.emit("server-setting-background-change-prop", {
          entity,
          name: data.name,
          color: data.color,
        })
      })
    }
  });
}