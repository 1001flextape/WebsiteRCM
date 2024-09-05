



import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocWysiwyg from "../../preMain/collaborateSameWysiwyg.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-wysiwyg-update', async ({
    entity,
    name,
    ydoc
  }) => {

    
    const sameDocTextField = makeCollaborateSameDocWysiwyg(d)

    sameDocTextField.updateYdocChange({
      entity,
      name,
      ydoc,
      socketId: socket.id,

    })
  });
}

