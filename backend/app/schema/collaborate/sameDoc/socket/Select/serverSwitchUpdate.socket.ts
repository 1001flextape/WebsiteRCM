import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import makeCollaborateSameDocSelect from "../../preMain/collaborateSameDocSelect.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-samedoc-select-change', async ({
    entity,
    name,
    value,
  }) => {
    
    const sameDocTextField = makeCollaborateSameDocSelect(d)

    sameDocTextField.updateSelectChange({
      entity,
      name,
      value,
      socketId: socket.id,
    })
  });
}
