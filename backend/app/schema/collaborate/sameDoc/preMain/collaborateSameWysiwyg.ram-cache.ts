import updateYdocChange from "./scripts/Wysiwyg/updateYdocChange.script";
import updateSelectionChange from "./scripts/Wysiwyg/updateSelectionChange.script";
import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import updateHtmlValueChange from "./scripts/Wysiwyg/updateHtmlValueChange.script";

export default function makeCollaborateSameDocWysiwyg(d: dependencies) {
  return {
    updateYdocChange: updateYdocChange(d),
    updateSelectionChange: updateSelectionChange(d),
    updateHtmlValueChange: updateHtmlValueChange(d),
  }
}