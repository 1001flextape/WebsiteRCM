import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSamepage from "../../../../_singleton/preMain/whoIsOnPage.ram-cache";
import { socketLookUpType } from "../../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types";
import _ from "lodash"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";

export type SamePageObject = {
  total: number
  users: socketLookUpType[]
}

type input = {
  url: string
}

export default function getAllUsersFromPage(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    const samePage = makeSamepage(d)

    const result = await samePage.getAllUsersFromUrl({
      url: args.url
    })

    //clean-up userId should be id in this context
    const listings = [...result.data].map(l => {
      l.id = l.userId

      return l
    })

    return {
      success: true,
      data: {
        total: listings?.length || 0,
        users: listings || []
      }
    }
  }
}


