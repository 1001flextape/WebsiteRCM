



import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocLinkSelection from "../../preMain/collaborateSameDocLinkSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-linkselection-readable-text-update', async ({
    entity,
    name,
    readableTextValue
  }) => {

    const sameDocLinkSelection = makeCollaborateSameDocLinkSelection(d)

    sameDocLinkSelection.updateReadableTextValueChange({
      entity,
      name,
      readableTextValue,
      socketId: socket.id,
    })
  });
}

