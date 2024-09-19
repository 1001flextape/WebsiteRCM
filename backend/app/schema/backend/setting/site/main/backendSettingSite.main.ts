import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/main/getOne.script"
import getOneRealTime from "./scripts/main/getOneRealTime.script"
import resetIsChanged from "./scripts/main/resetIsChanged.script"
import upsertOne from "./scripts/main/upsertOne.script"

export default function makeBackendSettingSiteMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
    getOneRealTime: getOneRealTime(d),
    resetIsChanged: resetIsChanged(d),
  }
}