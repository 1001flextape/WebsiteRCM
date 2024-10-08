import glob from "glob"
import { dependencies } from "./schema/utils/dependencies/type/dependencyInjection.types"

type input = {
    socket: any,
    d: dependencies
}

const socketInitScript = async ({ socket, d}: input) => {

  //////////////////////////////////////
  // Load sockets
  // ===================================
  let resolvers = [
    ...glob.sync("app/schema/*/*/*.socket.ts"),
    ...glob.sync("app/schema/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/*/*/*/*/*/*/*.socket.ts"),
    ...glob.sync("app/schema/*/*/*/*/*/*/*/*.socket.ts"),
  ];
  
  for (const resolver of resolvers) {
    require("../" + resolver).default({socket, d});
  } 
}

export default socketInitScript