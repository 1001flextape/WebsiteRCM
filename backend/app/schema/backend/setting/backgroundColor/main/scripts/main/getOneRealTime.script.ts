import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import makeBackendSettingBackgroundColorSql from "../../../preMain/backendSettingBackgroundColor.sql";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import RealTimeColorSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeColorSelectionAdapter";

type input = {
  socketId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingBackgroundColor'
    const settingsBackgroundColorSql = makeBackendSettingBackgroundColorSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

    const record = await settingsBackgroundColorSql.getOne()

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
          ...entityRecord.data.props,
          ...entityRecord.data.nonRealTimeProps,
          entity,
        }
      }

    } else {

      //adapter for every realtime property
      const backgroundColor_day: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorSelectionAdapter({
          color: record.data?.dataValues?.backgroundColor_day,
          name: "backgroundColor_day"
        }),
        name: "backgroundColor_day"
      }

      const backgroundColor_night: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeColorSelectionAdapter({
          color: record.data?.dataValues?.backgroundColor_night,
          name: "backgroundColor_night"
        }),
        name: "backgroundColor_night"
      }

      const isReady: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSwitchAdapter({
          initialBoolean: record.data?.dataValues?.isReady || false,
          name: "isReady"
        }),
        name: "isReady"
      }





      const setEntity = await sameDoc.set({
        entity,
        properties: [
            backgroundColor_day,
            backgroundColor_night,
            isReady,
        ],
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...record.data?.dataValues,
          ...setEntity.data.props,
          ...setEntity.data.nonRealTimeProps,
          entity,
        }
      }
    }
  }
}