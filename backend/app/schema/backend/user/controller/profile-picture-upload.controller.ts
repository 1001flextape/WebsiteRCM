import uploaderAuth from "../../../../uploader/auth/isAuthenticated"
import { profileUpload } from "./profile-upload.rules";
import makeWhoIsOnPage from "../../../collaborate/_singleton/preMain/whoIsOnPage.ram-cache";
import { makeDObj } from "../../../utils/dependencies/makeDependency";
import makeBackendUserProfileMain from "../main/backendUserProfile.main";


export default ({ app }) => {

  app.post('/backend/api/v1/profile/file', uploaderAuth.isAuthenticated, profileUpload.single("file"), async (req, res) => {
    let picture
    if (req.file?.filename) {
      picture = `/backend/api/v1/profile/file/${req.user.id}/${req.file.filename}`
    }

    const d = await makeDObj();
    d.dbTransaction = await d.db.transaction()

    const profile = makeBackendUserProfileMain(d)
    const whoIsOnPage = makeWhoIsOnPage(d)

    await profile.upsertOne({
      userId: req.user.id,
      callByType: req.body.callByType || undefined,
      circleColor: req.body.circleColor,
      firstName: req.body.firstName || undefined,
      labelColor: req.body.labelColor,
      lastName: req.body.lastName || undefined,
      username: req.body.username || undefined,
      picture: req.body.pictureAction === "remove" ? null : picture,
    })

    
    //change displays for all user sockets.
    await whoIsOnPage.changeDisplayForUser({
      id: req.user.id,
    })
    
    d.dbTransaction.commit()

    let data: any = {}

    if (req.body.pictureAction === "remove") {
      data.link = null
    }

    if (picture) {
      data.link = picture
    }

    return res.status(200).json({
      success: true,
      data,
    })
  })

}