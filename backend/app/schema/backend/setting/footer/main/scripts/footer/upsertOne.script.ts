import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import backendSettingFooter from "../../../../../../../models/backend/setting/backendSettingFooter.model";
import makeBackendSettingFooterSql from "../../../preMain/backendSettingFooter.sql";
import makeBackendSettingFooterBuiltInMain from "../../backendSettingFooterBuiltIn.main";
import { SelectionTypeEnum } from "../../../../../../../models/backend/setting/backendSettingHeader.model";

type input = {
  userAnswers?: string
  isChanged?: boolean
  isReady?: boolean,
  selectionType?: SelectionTypeEnum,
  selectionId?: string,
}

// selectionType: SelectionTypeEnum;

export default function upsertOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendSettingFooter> | null>> => {

    const sql = makeBackendSettingFooterSql(d);

    let webAssetImport: string;
    let menuJsonB: any;

    if (args.selectionType) {
      switch (args.selectionType) {
        case SelectionTypeEnum.BUILT_IN:
          const builtInMain = makeBackendSettingFooterBuiltInMain(d)

          // update with getOne function in future. 
          const builtIn = await builtInMain.getOneById({
            id: args.selectionId
          })

          webAssetImport = builtIn.data.dataValues.webAssetImport
          menuJsonB = builtIn.data.dataValues.menuJsonB
          break;

        default:
          return {
            success: false,
            humanMessage: "Error with selecting component. 'BUILT_IN', 'PLUGIN', 'AGENCY', 'MARKET' ",
            errorIdentifier: "backendSettingFooter_upsertOne:0001",
          }
      }
    }

    // webAssetImport?: string
    // menuJsonB?: string
    // userAnswersJsonB?: string

    const response = sql.upsertOne({
      webAssetImport: webAssetImport,
      menuJsonB: menuJsonB,
      userAnswersJsonB: args.userAnswers,
      isChanged: args.isChanged,
      isReady: args.isReady,
      selectionType: args.selectionType,
      selectionId: args.selectionId,

    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}