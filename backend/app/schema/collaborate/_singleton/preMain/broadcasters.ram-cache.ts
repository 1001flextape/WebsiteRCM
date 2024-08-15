import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import broadcastByUrl from "./scripts/broadcasters/broadcastByUrl.script"
import broadcastForNotification from "./scripts/broadcasters/broadcastForNotification.script"
import broadCastToAllSockets from "./scripts/broadcasters/broadCastToAllSockets.script"

export default function makeBoardcasters(d: dependencies) {
  return {
    broadCastToAllSockets: broadCastToAllSockets(d),
    broadcastByUrl: broadcastByUrl(d),
    broadcastForNotification: broadcastForNotification(d),
  }
}