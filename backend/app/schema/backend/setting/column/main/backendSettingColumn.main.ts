import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/main/getOne.script"
import resetIsChanged from "./scripts/main/resetIsChanged.script";
// import getOneRealTime from "./scripts/main/getOneRealTime.script";
import upsertOne from "./scripts/main/upsertOne.script";

export default function makeBackendSettingColumnMain(d: dependencies) {

  return {
    getOne: getOne(d),
    // getOneRealTime: getOneRealTime(d),
    upsertOne: upsertOne(d),
    resetIsChanged: resetIsChanged(d),
  }
}
