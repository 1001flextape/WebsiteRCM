import makeBackendUserSql from "../../../../user/preMain/backendUser.sql"
import makeBackendSiteDesignerDiscussionSql from "../backendSiteDesignerDiscussion.sql"
import makeBackendSiteDesignerDiscussionCommentSql from "../backendSiteDesignerDiscussionComment.sql"
import makeBackendSiteDesignerDiscussionCommentValidation from "../backendSiteDesignerDiscussionComment.validation"
import { makeDTestObj } from "../../../../../utils/dependencies/makeTestDependency"
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
jest.setTimeout(100000)

describe("test backendSiteDesignerDiscussionComment.validation.js", () => {
  let d: dependencies
  let recordId: string

  beforeAll(async () => {

    d = await makeDTestObj()
    
    const userSql = makeBackendUserSql(d)

    const discussionSql = makeBackendSiteDesignerDiscussionSql(d)
    const discussionCommentSql = makeBackendSiteDesignerDiscussionCommentSql(d)

    const user = await userSql.addOne({
      email: "email@test.com",
      password: "Password1!",
    })

    const discussion = (await discussionSql.addOne({
      post: "post",
      title: "title",
      userId: user.data.dataValues.id,
    }))

    const discussionComment = (await discussionCommentSql.addOne(
      {
        post: "blah",
        discussionId: discussion.data.dataValues.id,
        userId: user.data.dataValues.id,
      })
    )

    recordId = discussionComment.data.dataValues.id

  }, 100000)

  test("areIdsValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [recordId]
    })
    expect(areIdsValid.result).toBe(true);
  })

  test("areIdsValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    const areIdsValid = await roleValidation.areIdsValid({
      idArray: [
        "3a06e07e-0817-4800-83fb-3784d2ac585e",
      ]
    })

    expect(areIdsValid.result).toBe(false);
  })

  test("isIdValid: Yes", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: recordId,
    })

    expect(isIdValid.result).toBe(true);
  })

  test("isIdValid: No", async () => {
    const roleValidation = makeBackendSiteDesignerDiscussionCommentValidation(d)

    const isIdValid = await roleValidation.isIdValid({
      id: "3a06e07e-0817-4800-83fb-3784d2ac585e",
    })

    expect(isIdValid.result).toBe(false);
  })

  afterAll(async () => {
    ;
    await d.dbTransaction.rollback();
  })
})