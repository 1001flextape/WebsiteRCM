



import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocLinkSelection from "../../preMain/collaborateSameDocLinkSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-linkselection-yjs-update', async ({
    entity,
    name,
    ydoc
  }) => {

    
    const sameDocLinkSelection = makeCollaborateSameDocLinkSelection(d)

    sameDocLinkSelection.updateYdocChange({
      entity,
      name,
      ydoc,
      socketId: socket.id,

    })
  });
}

