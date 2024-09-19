import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/header/getOne.script"
import upsertOne from "./scripts/header/upsertOne.script"
import resetIsChanged from "./scripts/header/resetIsChanged.script"

export default function makeBackendSettingHeaderSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
    resetIsChanged: resetIsChanged(d),
  }
}