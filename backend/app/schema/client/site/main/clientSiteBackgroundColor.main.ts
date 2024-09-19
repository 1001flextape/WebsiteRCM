import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/backgroundColorMain/getOne.script";
import upsertOne from "./scripts/backgroundColorMain/upsertOne.script";

export default function makeClientSiteBackgroundColorMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}