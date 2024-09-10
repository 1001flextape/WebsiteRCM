// this file is about converting database json into variables for sameDoc.set()

import { returningSuccessObj } from "../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import { RealTimeAdapterPropertyValue, RealTimeAllAdapters } from "./set.script";
import RealTimeColorSelectionAdapter from "../../../forUsage/adapters/RealTimeColorSelectionAdapter";
import RealTimeMediaSelectionAdapter from "../../../forUsage/adapters/RealTimeMediaSelectionAdapter";
import RealTimeLinkSelectionAdapter from "../../../forUsage/adapters/RealTimeLinkSelectionAdapter";
import RealTimeWysiwygAdapter from "../../../forUsage/adapters/RealTimeWysiwygAdapter";

type sameDocMenuItemType =
  | {
    header?: string;
    type?: string;
    isShowing?: { prop: string };
    data?: Array<{
      label: string;
      prop: string;
      type: string;
      defaultValue?: string;
      isShowing?: string;
    }>;
  };

export type sameDocMenuType = {
  menu?: sameDocMenuItemType[];
};

type input = {
  menu: sameDocMenuType,
  userAnswers: any,
}


export type EntityMenuItemType =
  | {
    header?: string;
    type?: string;
    isShowing?: {
      // adapterId?: string;
      name?: string;
    };
    data?: Array<{
      // adapterId?: string;
      name?: string;
    }>;
  };

export type EntityMenuType = {
  menu: EntityMenuItemType[];
};

type output = {
  adapters: RealTimeAdapterPropertyValue[],
  menu: EntityMenuType,
}

type selectAdapterInput = {
  type?: string,
  prop?: string,
  initialValue?: any,
  userAnswers?: any,
  label?: string,
  isShowing?: string,
}

export const selectAdapter = ({ type, prop, initialValue, userAnswers, label, isShowing }: selectAdapterInput) => {
  switch (type) {
    case "LINK_SELECTION:V1":
      let initialLink: string

      if (initialValue) {
        initialLink = initialValue.value
      }

      if (userAnswers && userAnswers[prop]) {
        initialLink = userAnswers[prop].value
      }

      return new RealTimeLinkSelectionAdapter({
        initialText: initialLink || "",
        name: prop,
        label,
      })
    case "TEXTFIELD:V1":
      let initialText: string

      if (initialValue) {
        initialText = initialValue.value
      }

      if (userAnswers && userAnswers[prop]) {
        initialText = userAnswers[prop].value
      }

      return new RealTimeYDocAdapter({
        initialText: initialText || "",
        name: prop,
        label,
      })
    case "WYSIWYG:V1":
      let initialWysisyg: string
      let initialDelta: any

      if (initialValue) {
        initialWysisyg = initialValue.value
      }

      if (userAnswers && userAnswers[prop]?.value) {
        initialWysisyg = userAnswers[prop].value.html
      }

      if (userAnswers && userAnswers[prop]) {
        initialDelta = userAnswers[prop].value.delta
      }

      return new RealTimeWysiwygAdapter({
        initialText: initialWysisyg || "",
        initialDelta: initialDelta,
        name: prop,
        label,
      })
    case "SWITCH:V1":
      let initialBoolean;

      if (initialValue !== undefined) {
        initialBoolean = initialValue
      }

      if (userAnswers && userAnswers[prop] !== undefined && userAnswers[prop] !== null) {
        initialBoolean = userAnswers[prop].value
      }

      return new RealTimeSwitchAdapter({
        initialBoolean: initialBoolean || false,
        name: prop,
        label,
      })

    case "COLOR_SELECTION:V1":
      let color
      let suggestedTextColor;

      if (initialValue !== undefined && initialValue !== null) {
        color = initialValue?.color
        suggestedTextColor = initialValue?.suggestedTextColor
      }

      if (userAnswers && userAnswers[prop]) {
        color = userAnswers[prop]?.value?.color
        suggestedTextColor = userAnswers[prop]?.value?.suggestedTextColor
      }

      return new RealTimeColorSelectionAdapter({
        name: prop,
        color: color || "#fff",
        suggestedTextColor,
        label,
        isShowing,
      })

    case "MEDIA_SELECTION:V1":
      let media

      if (initialValue !== undefined) {
        media = initialValue?.value?.url
      }

      if (userAnswers && userAnswers[prop]?.value?.url) {
        media = userAnswers[prop].value.url
      }

      return new RealTimeMediaSelectionAdapter({
        name: prop,
        media,
        label,
      })
    default:
      return null
  }
}

export default function adaptersFromMenuAndAnswers(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<output>> => {
    if (typeof (args.userAnswers) === 'string') {
      args.userAnswers = JSON.parse(args.userAnswers)
    }

    const adapters: RealTimeAdapterPropertyValue[] = []
    let menu: EntityMenuType = {
      menu: []
    }

    if (!args.menu?.menu?.length) {
      return {
        success: true,
        data: {
          adapters: [],
          menu: null,
        },
      }
    }

    for (let i = 0; i < args.menu.menu.length; i++) {
      const m = args.menu.menu[i];

      const newMenuItem: EntityMenuItemType = {
        header: m.header,
        type: m.type,
        data: []
      }

      //isShowing
      if (m?.isShowing?.prop) {
        const adapter = selectAdapter({
          prop: m.isShowing.prop,
          initialValue: true,
          type: "SWITCH:V1",
          userAnswers: args.userAnswers,
        })
        adapters.push({
          adapter,
          name: m.isShowing.prop,
        })

        newMenuItem.isShowing = {
          // adapterId: adapter.id,
          name: adapter.name,
        }
      }

      for (let x = 0; x < m.data.length; x++) {
        const data = m.data[x];


        const adapter = selectAdapter({
          type: data.type,
          initialValue: data.defaultValue,
          prop: data.prop,
          userAnswers: args.userAnswers,
          label: data.label,
          isShowing: data.isShowing,
        })

        if (adapter) {
          newMenuItem.data.push({
            // adapterId: adapter.id,
            name: adapter.name,
          })

          adapters.push({
            adapter,
            name: data.prop,
          })
        }

      }

      menu.menu.push(newMenuItem)
    }

    return {
      success: true,
      data: {
        adapters,
        menu,
      },
    }
  }
}


