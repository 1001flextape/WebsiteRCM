import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getOneById from "./scripts/userProfileSql/getOneById.script"
import getOneByUserId from "./scripts/userProfileSql/getOneByUserId.script"
import upsertOne from "./scripts/userProfileSql/upsertOne.script"

export default function makeBackendUserProfileSql(d: dependencies) {
  return {
    getOneById: getOneById(d),
    getOneByUserId: getOneByUserId(d),
    upsertOne: upsertOne(d),
  }
}