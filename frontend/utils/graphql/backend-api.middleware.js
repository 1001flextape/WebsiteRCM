import { getUserToken } from "./user";

// const endpoint = "http://localhost:8010/graphql";
const endpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/graphql` || "http://localhost:8080/graphql";

const subDomainEndpoint =  `${process.env.NEXT_PUBLIC_WEB_API_URL}/graphql` || "http://localhost:8080/graphql";

// WEB_API_URL
export const callApiMiddleware = ({ query, variables }) => {
  return new Promise(async (resolve) => {


    const graphqlQuery = {
      query,
      variables
    };
    console.log('!!!!', graphqlQuery)
    const response = await fetch(endpoint,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(graphqlQuery)
      });
    // const response = await axios({
    //   url: endpoint,
    //   method: 'post',
    //   headers:
    //     token ?
    //       {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //       } :
    //       {
    //         "Content-Type": "application/json",
    //       }
    //   ,
    //   data: graphqlQuery
    // });

    const result = await response.json();
    console.log('graphqlQuery', result)

    return resolve(result);
  })
}


// WEB_API_URL
export const callSubDomainApiMiddlewareWithToken = ({ token, query, variables, noAuth }) => {
  return new Promise(async (resolve) => {

    const graphqlQuery = {
      query,
      variables
    };
    
    const response = await fetch(subDomainEndpoint,
      {
        method: 'POST',
        headers:
          token && !noAuth ?
            {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            } :
            {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(graphqlQuery)
      });
      
      console.log(await response.text())
    // const response = await axios({
    //   url: endpoint,
    //   method: 'post',
    //   headers:
    //     token ?
    //       {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token}`
    //       } :
    //       {
    //         "Content-Type": "application/json",
    //       }
    //   ,
    //   data: graphqlQuery
    // });

    const result = await response.json();

    return resolve(result);
  })
}