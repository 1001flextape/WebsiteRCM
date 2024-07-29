import makeBackendNotificationValidation from "../preMain/backendNotification.validation"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getFirstByCount from "./scripts/main/getFirstByCount.script"
import getUnseenNotificationCount from "./scripts/main/getUnseenNotificationCount.script"
import hasBeenClick from "./scripts/main/hasBeenClick.script"
import hasBeenSeen from "./scripts/main/hasBeenSeen.script"
import updateOne from "./scripts/main/updateOne.script"
import hasBeenSeenById from "./scripts/main/hasBeenSeenById.script"
import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"



export default function makeBackendNotificationMain(d: dependencies) {
  const validators = makeBackendNotificationValidation(d)

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getFirstByCount: getFirstByCount(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getUnseenNotificationCount:getUnseenNotificationCount(d),
    hasBeenClick: hasBeenClick(d),
    hasBeenSeen: hasBeenSeen(d),
    hasBeenSeenById: hasBeenSeenById(d),
    updateOne: updateOne(d),

    ...validators,
  }
}
