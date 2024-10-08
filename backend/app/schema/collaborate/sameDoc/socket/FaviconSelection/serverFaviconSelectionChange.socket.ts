import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocFaviconSelection from "../../preMain/collaborateSameDocFaviconSelection.ram-cache";
import makeCollaborateSameDocPictureSelection from "../../preMain/collaborateSameDocPictureSelection.ram-cache";

type input = {
  socket: any,
  d: dependencies,
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-favicon-selection-change', async ({
    entity,
    name,
    selection,
  }) => {
    
    const sameDocFavicon = makeCollaborateSameDocFaviconSelection(d)

    sameDocFavicon.updateSelectionChange({
      entity,
      name,
      selection,
      socketId: socket.id,
    })
  });
}
