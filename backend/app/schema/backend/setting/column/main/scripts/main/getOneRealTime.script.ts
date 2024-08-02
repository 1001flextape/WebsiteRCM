import makeCollaborateSameDoc from "../../../../../../collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import RealTimeYDocAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeYDocAdapter";
import { RealTimeAdapterPropertyValue } from "../../../../../../collaborate/sameDoc/preMain/scripts/SameDoc/set.script";
import RealTimeSwitchAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSwitchAdapter";
import RealTimePictureSelectionAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimePictureSelectionAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeBackendSettingColumnSql from "../../../preMain/backendSettingColumn.sql";
import RealTimeSelectAdapter from "../../../../../../collaborate/sameDoc/forUsage/adapters/RealTimeSelectAdapter";

type input = {
  socketId: string;
}

export default function getOneRealTime(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<any>> => {

    const entity = 'backendSettingColumn'
    const settingsColumnSql = makeBackendSettingColumnSql(d);
    const sameDoc = makeCollaborateSameDoc(d)

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
          ...entityRecord.data.props,
          ...entityRecord.data.nonRealTimeProps,
          entity,
        }
      }

    } else {

      const record = await settingsColumnSql.getOne()

      //adapter for every realtime property
      const width: RealTimeAdapterPropertyValue = {
        adapter: new RealTimeSelectAdapter({
          initialValue: record?.data?.dataValues?.width || "1000px",
          name: "width"
        }),
        name: "width"
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
          width,
          isReady,
        ],
        socketId: args.socketId,
      })

      return {
        success: true,
        data: {
          ...setEntity.data.props,
          ...setEntity.data.nonRealTimeProps,
          entity,
        }
      }
    }
  }
}