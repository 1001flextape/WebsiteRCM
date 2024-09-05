



import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocWysiwyg from "../../preMain/collaborateSameWysiwyg.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-wysiwyg-readable-text-update', async ({
    entity,
    name,
    htmlValue,
  }) => {

    const sameDocTextField = makeCollaborateSameDocWysiwyg(d)

    sameDocTextField.updateHtmlValueChange({
      entity,
      name,
      htmlValue,
      socketId: socket.id,
    })
  });
}

