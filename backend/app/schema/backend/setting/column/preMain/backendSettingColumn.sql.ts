import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import resetIsChanged from "./scripts/sql/resetIsChanged.script"
import upsertOne from "./scripts/sql/upsertOne.script"

export default function makeBackendSettingColumnSql(d: dependencies) {

  return {
    getOne: getOne(d),
    resetIsChanged: resetIsChanged(d),
    upsertOne: upsertOne(d),
  }
}