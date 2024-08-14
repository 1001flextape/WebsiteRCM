import { returningSuccessObj } from '../types/returningObjs.types';

type input = {
  hint?: string
  errorIdentifier?: string
  data?: any

}

const endMainFromError = (args?: input): returningSuccessObj<null> => {
  if (!args) {
    return {
      success: false,
      humanMessage: "Not Authorized!",
    }
  }

  const { hint, errorIdentifier, data } = args


  return {
    success: false,
    humanMessage: hint || "Not Authorized!",
    errorIdentifier,
    data,
  }
}

export default endMainFromError