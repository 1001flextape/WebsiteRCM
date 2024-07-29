import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import lookupCookieTokenGet from "./scripts/cache/lookupCookieToken.get.reddis"
import lookupCookieTokenSet from "./scripts/cache/lookupCookieToken.set.reddis"

export default function makeBackendAuthCache(d: dependencies) {

  return {
    lookupCookieTokenGet: lookupCookieTokenGet(d),
    lookupCookieTokenSet: lookupCookieTokenSet(d),
  }
}