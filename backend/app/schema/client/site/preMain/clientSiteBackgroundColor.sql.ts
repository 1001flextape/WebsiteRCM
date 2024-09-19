import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/backgroundColorSql/getOne.script";
import upsertOne from "./scripts/backgroundColorSql/upsertOne.script";

export default function makeClientSiteBackgroundColorSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}