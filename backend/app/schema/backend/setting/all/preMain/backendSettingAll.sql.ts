import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import isSettingReady from "./scripts/isSettingReady.script"
import isWebsiteSettingReady from "./scripts/isWebsiteSettingReady.script"

export default function makeBackendSettingAllSql(d: dependencies) {

  return {
    isSettingReady: isSettingReady(d),
    isWebsiteSettingReady: isWebsiteSettingReady(d),
  }
}