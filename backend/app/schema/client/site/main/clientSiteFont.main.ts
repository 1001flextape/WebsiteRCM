import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/fontMain/getOne.script";
import upsertOne from "./scripts/fontMain/upsertOne.script";

export default function makeClientSiteFontMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}