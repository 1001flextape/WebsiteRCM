import { NextResponse } from "next/server";
import { callApiMiddleware } from "./utils/graphql/backend-api.middleware";

const checkTokenValid = async ({ token }) => {

  const response = await callApiMiddleware({
    query: `
    mutation($token: String!) {
      backendAuth_isTokenValid(token: $token) {
        result
      }
    }
    `,
    variables: { token }
  })

  if (response.errors) {
    return false
  }

  console.log('!!!!', response.data?.backendAuth_isTokenValid?.result)
  return response?.data?.backendAuth_isTokenValid?.result ? true : false
}

const getSignUpURL = ({origin, returnURL}) => {
  if (returnURL === "") {
    return `${origin}/auth/signin?url=${returnURL}`
  } else {
    return `${origin}/auth/signin`
  }

}

export async function middleware(req) {
  const { pathname, origin, search } = req.nextUrl
  const returnURL = encodeURIComponent(`${pathname}${search}`)
  const redirectSignUpURL = getSignUpURL({origin, returnURL})
  const isVcRoute = req.nextUrl.pathname.startsWith('/portal')
  const isClientRoute = req.nextUrl.pathname.startsWith('/client')
  const isBuilderRoute = req.nextUrl.pathname.startsWith('/builder')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  const authToken = req.cookies.get("authToken")
  console.log("!!!!!!!!!!!!Middleware!")
  
  if (isVcRoute || isClientRoute || isBuilderRoute) {
    console.log('Protected route called.', origin, returnURL)
    if (authToken?.value) {

      /////////////////////////////////////////// THIS IS WHERE I LEFT OFF!!!!!
      const isTokenValid = await checkTokenValid({ token: authToken?.value })

      if (!isTokenValid) {

        return NextResponse.redirect(redirectSignUpURL)
      }

    } else {
      return NextResponse.redirect(redirectSignUpURL)
    }
  }

  if (isAuthRoute) {
    console.log('Auth route called')
    if (authToken?.value) {

      const isTokenValid = await checkTokenValid({ token: authToken?.value })

      if (isTokenValid) {

        return NextResponse.redirect(`${origin}/portal/dashboard`)
      } 
      // else {
      //   return NextResponse.redirect(`${origin}/auth/signin?url=${returnURL}`)
      // }
    }
  }

  return NextResponse.next()
}

