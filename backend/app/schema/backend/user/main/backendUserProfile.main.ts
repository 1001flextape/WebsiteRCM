import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/profileMain/getOneById.script"
import getOneByUserId from "./scripts/profileMain/getOneByUserId.script"
import upsertOne from "./scripts/profileMain/upsertOne.script"

export default function makeBackendUserProfileMain(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByUserId: getOneByUserId(d),
    upsertOne: upsertOne(d),
  }
}