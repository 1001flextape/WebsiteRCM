import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import updateYdocChange from "./scripts/LinkSelection/updateYdocChange.script";
import updateSelectionChange from "./scripts/LinkSelection/updateSelectionChange.script";
import updateReadableTextValueChange from "./scripts/LinkSelection/updateReadableTextValueChange.script";

export default function makeCollaborateSameDocLinkSelection(d: dependencies) {
  return {
    updateYdocChange: updateYdocChange(d),
    updateSelectionChange: updateSelectionChange(d),
    updateReadableTextValueChange: updateReadableTextValueChange(d),
  }
}