import graphqlError from "../../../../utils/graphql/grarphql.errorhandler";
import makebackendProjectMain from "../main/backendProject.main";

const backendProjectResolver = {
  Query: {
    backendProject_getManyWithPagination: async (parent, args, ctx) => {
      const main = makebackendProjectMain(ctx.d)

      const response = await main.getManyWithPagination({
        page: args.page,
        pageSize: args.pageSize,
        q: args.q,
      })

      if (response?.success) {
        return response.data

      } else {
        return graphqlError(response)
      }
    },
  },
};

export default backendProjectResolver;