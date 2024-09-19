import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/fontSql/getOne.script";
import upsertOne from "./scripts/fontSql/upsertOne.script";

export default function makeClientSiteFontSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}