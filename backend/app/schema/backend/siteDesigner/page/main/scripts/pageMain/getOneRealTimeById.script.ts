import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendSiteDesignerPageSql from "../../../preMain/backendSiteDesignerPage.sql";
import { PageStatusEnum } from "../../../../../../../models/backend/siteDesigner/page/backendSiteDesignerPage.model";

type input = {
  socketId: string;
  id: string;
}

export default function getOneRealTimeById(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = `backendSiteDesignerPage_${args.id}`

    const pageSql = makeBackendSiteDesignerPageSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await pageSql.getOneById({
      id: args.id,
    })

    const doesEntityExist = await sameDoc.doesEntityExist({
      entity,
    })

    if (doesEntityExist.result) {
      //get
      const entityRecord = await sameDoc.getByEntity({
        entity,
      })

      await sameDoc.userConnectsToEntity({
        entity,
        socketId: args.socketId,
      })

      // // add subscription to user viewing entity
      // entityRecord.data.addSocket({
      //   socketId: args.socketId
      // })


      return {
        success: true,
        data: {
          ...record.data,
          ...entityRecord.data.nonRealTimeProps,
          ...entityRecord.data.props,
          entity,
        }
      }

    } else {

      const isReady: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: record.data?.dataValues?.isReady || false,
          name: "isReady"
        }),
        name: "isReady"
      }

      const isDraft: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: record.data?.dataValues?.status === PageStatusEnum.Draft ? true : false,
          name: "isDraft"
        }),
        name: "isDraft"
      } 

      const setEntity = await sameDoc.set({
        entity,
        properties: [
          isReady,
          isDraft,
        ],
        nonRealTimeProps:{
          isRecentlyCreated: record.data?.dataValues?.isRecentlyCreated,
          status: record.data?.dataValues?.status,
        },
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...setEntity.data.nonRealTimeProps,
          ...setEntity.data.props,
          entity,
        }
      }
    }
  }
}