import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/headerSql/addOne.script";
import getOneById from "./scripts/headerSql/getOneById.script";
import getOneByProjectId from "./scripts/headerSql/getOneByProjectId.script";

export default function makeBackendProjectHeaderSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}