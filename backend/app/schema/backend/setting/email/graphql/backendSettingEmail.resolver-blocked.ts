// import { Sequelize } from "sequelize-typescript";
// import emptyTestSubdomainDb from "../../../../../../models/_test/emptyTestDb";
// import graphqlError from "../../../../../utils/errorHandling/handers/graphql.errorhandler";
// import sequelizeErrorHandler from "../../../../../utils/errorHandling/handers/sequelize.errorHandler";
// import { d_domain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
// import emptyTestDomainDb from "../../../../../../models/domain/_test/emptyTestDb";

// const makeDObj = async (): Promise<d_domain> => {
//   const domainDb: Sequelize = await emptyTestDomainDb();
//   const domainTransaction = await domainDb.transaction();

//   return {
//     domainDb,
//     domainTransaction,
//     loggers: [console],
//     errorHandler: sequelizeErrorHandler,
//   }
// }

// const backendSettingEmailGqlResolver = {
//   Query: {
//     backendSetting_lookUp_getOne: async (parent, args, ctx) => {

//       const d = await makeDObj()
//       const main = makeBackendSettingEmailMain(d)

//       const response = await main.getOne()

//       if (response?.success) {
//         d.domainTransaction.commit()
//         return response.data.dataValues

//       } else {
//         d.domainTransaction.rollback()
//         return graphqlError(response)
//       }
//     },
//   },
//   Mutation: {
//     backendSetting_lookUp_updateOne: async (parent, args, ctx) => {

//       const d = await makeDObj()
//       const main = makeBackendSettingEmailMain(d)

//       const response = await main.updateOne({
//         emailVerificationMessage: args.emailVerificationMessage,
//         emailVerificationSubject: args.emailVerificationSubject,
//         inviteUserMessage: args.inviteUserMessage,
//         inviteUserSubject: args.inviteUserSubject,
//         passwordResetMessage: args.passwordResetMessage,
//         passwordResetSubject: args.passwordResetSubject,
//         resetPasswordEmailMessage: args.resetPasswordEmailMessage,
//         resetPasswordEmailSubject: args.resetPasswordEmailSubject,
//       })

//       if (response?.success) {
//         d.domainTransaction.commit()
//         return response.data.dataValues

//       } else {
//         d.domainTransaction.rollback()
//         return graphqlError(response)
//       }
//     },

//   },
// }

// export default backendSettingEmailGqlResolver
