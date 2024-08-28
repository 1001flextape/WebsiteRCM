import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocLinkSelection from "../../preMain/collaborateSameDocLinkSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-linkselection-selection-change', async ({
    entity,
    name,
    range,
  }) => {

    const sameDocLinkSelection = makeCollaborateSameDocLinkSelection(d)

    sameDocLinkSelection.updateSelectionChange({
      entity,
      name,
      range,
      socketId: socket.id,
    })
  });
}
