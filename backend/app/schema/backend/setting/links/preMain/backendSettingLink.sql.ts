import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import upsertOne from "./scripts/sql/upsertOne.script"
import resetIsChanged from "./scripts/sql/resetIsChanged.script"

export default function makeBackendSettingLinkSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
    resetIsChanged: resetIsChanged(d),
  }
}