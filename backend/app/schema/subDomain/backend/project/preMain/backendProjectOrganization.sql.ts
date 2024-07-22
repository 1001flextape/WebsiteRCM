import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/organizationSql/addOne.script";
import getOneById from "./scripts/organizationSql/getOneById.script";
import getOneByProjectId from "./scripts/organizationSql/getOneByProjectId.script";

export default function makeBackendProjectOrganizationSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}
