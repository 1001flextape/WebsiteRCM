import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/main/addOne.script";
import deactivateOne from "./scripts/main/deactivateOne.script";
import deleteOne from "./scripts/main/deleteOne.script";
import getManyWithPagination from "./scripts/main/getManyWithPagination.script";
import getOneByEmail from "./scripts/main/getOneByEmail.script";
import getOneById from "./scripts/main/getOneById.script";
import getOneRealTime from "./scripts/main/getOneRealTime.script";
import reactivateOne from "./scripts/main/reactivateOne.script";
import updateOne from "./scripts/main/updateOne.script";


export default function makeBackendUserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deactivateOne: deactivateOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getOneRealTime: getOneRealTime(d),
    getOneByEmail: getOneByEmail(d),
    reactivateOne: reactivateOne(d),
    updateOne: updateOne(d),
  }
}



