import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import resetIsChanged from "./scripts/sql/resetIsChanged.script"
import upsertOne from "./scripts/sql/upsertOne.script"

export default function makeBackendSettingSiteSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
    resetIsChanged: resetIsChanged(d),
  }
}