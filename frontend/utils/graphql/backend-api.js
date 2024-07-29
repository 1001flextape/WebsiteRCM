import { getUserToken } from "./user";
import axios from 'axios'

// const endpoint = "http://localhost:8010/graphql";
const endpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/graphql` || "http://localhost:8080/graphql";


export const callApi = ({ query, variables }) => {
  return new Promise(async (resolve) => {

    const token = getUserToken()

    const graphqlQuery = {
      query,
      variables
    };

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers:
        token ?
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          } :
          {
            "Content-Type": "application/json",
          }
      ,
      data: graphqlQuery
    });

    return resolve(response);
  })
}