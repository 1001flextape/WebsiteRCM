import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/footer/getOne.script"
import getOneRealTime from "./scripts/footer/getOneRealTime.script";
import resetIsChanged from "./scripts/footer/resetIsChanged.script";
import selectFooter from "./scripts/footer/selectFooter.script";
import upsertOne from "./scripts/footer/upsertOne.script";

export default function makeBackendSettingFooterMain(d: dependencies) {

  return {
    getOne: getOne(d),
    getOneRealTime: getOneRealTime(d),
    upsertOne: upsertOne(d),
    selectFooter: selectFooter(d),
    resetIsChanged: resetIsChanged(d),
  }
}
