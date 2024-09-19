import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/sectionNormal/addOne.script";
import deleteOne from "./scripts/sectionNormal/deleteOne.script";
import getManyByPageId from "./scripts/sectionNormal/getManyByPageId.script";
import getMany from "./scripts/sectionNormal/getMany.script";
import getOneById from "./scripts/sectionNormal/getOneById.script";
import getOneRealTimeById from "./scripts/sectionNormal/getOneRealTimeById.script";
import updateOne from "./scripts/sectionNormal/updateOne.script";
import getManyPublishable from "./scripts/sectionNormal/getManyPublishable.script";

export default function makeBackendSiteDesignerPageSectionNormalMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyByPageId: getManyByPageId(d),
    getMany: getMany(d),
    getManyPublishable: getManyPublishable(d),
    getOneById: getOneById(d),
    getOneRealTimeById: getOneRealTimeById(d),
    updateOne: updateOne(d),
  }
}
