import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/columnSql/getOne.script";
import upsertOne from "./scripts/columnSql/upsertOne.script";

export default function makeClientSiteColumnSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}