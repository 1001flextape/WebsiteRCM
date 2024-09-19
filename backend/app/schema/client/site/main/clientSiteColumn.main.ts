import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/columnMain/getOne.script";
import upsertOne from "./scripts/columnMain/upsertOne.script";

export default function makeClientSiteColumnMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}