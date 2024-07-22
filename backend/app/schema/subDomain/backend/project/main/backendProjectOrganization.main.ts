import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/organizationMain/addOne.script";
import getOneById from "./scripts/organizationMain/getOneById.script";
import getOneByProjectId from "./scripts/organizationMain/getOneByProjectId.script";

export default function makeBackendProjectOrganizationMain(d: dependencies) {

  return {
    addOne: addOne(d),
    getOneById: getOneById(d),
    getOneByProjectId: getOneByProjectId(d),
  }
}