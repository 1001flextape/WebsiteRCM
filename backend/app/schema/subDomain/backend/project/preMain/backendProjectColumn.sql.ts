import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOneById from "./scripts/columnSql/getOneById.script";
import addOne from "./scripts/columnSql/addOne.script";
import getOneByProjectId from "./scripts/columnSql/getOneByProjectId.script";

export default function makeBackendProjectColumnSql(d: dependencies) {

  return {
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
    addOne: addOne(d),
  }
}