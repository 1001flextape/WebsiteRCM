import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDoc from "../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-page-loud-section-change-prop', async (data) => {

    const sameDoc = makeCollaborateSameDoc(d)

    const record = await sameDoc.getByEntity({
      entity: data.entity,
    })

    if (record.data?.updateUserAnswer) {
      record.data.updateUserAnswer({
        name: data.name,
        value: data.value,
      })
    }

    if (record.data.sockets) {
      record.data.sockets.map(s => {
        s.socket.emit("page-loud-section-change-prop", {
          entity: data.entity,
          name: data.name,
          value: data.value,
        })
      })
    }
  });
}