import { dependencies } from "../../utils/dependencies/type/dependencyInjection.types";
import makeBackendAuthMain from "./main/backendAuth.main";

export default function makeFoundationUserEntity(d: dependencies) {
  const authMain = makeBackendAuthMain(d)


  return {
    authMain,
  }
}