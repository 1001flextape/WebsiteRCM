import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import updateSelectChange from "./scripts/Select/updateSelectChange.script";

export default function makeCollaborateSameDocSelect(d: dependencies) {
  return {
    updateSelectChange: updateSelectChange(d)
  }
}