import uploaderAuth from "../../../../../uploader/auth/isAuthenticated";
import makeBackendSettingOrganizationMain from "../main/backendSettingOrganization.main";
import path from "path";
import fs from 'fs-extra'
import util from 'util';
import { previewLogoUpload } from "./preview-logo-upload.rules";
import { makeDObj } from "../../../../utils/dependencies/makeDependency";
import makeBoardcasters from "../../../../collaborate/_singleton/preMain/broadcasters.ram-cache";


export default ({ app }) => {

  app.post('/backend/api/v1/logo/file/', uploaderAuth.isAuthenticated, previewLogoUpload.single('file'), async (req, res) => {
    let logo = req.body.previewLogo //undefined vs null
    if (req.body.previewLogo === "undefined") {
      logo = undefined
    }

    if (req.body.previewLogo === "null") {
      logo = null
    }

    if (req.body.shouldApplyToTopNavMenu === "undefined") {
      req.body.shouldApplyToTopNavMenu = undefined
    }

    const regex = /\/backend\/api\/v1\/logo\/preview\/file\/(\d{4})\/(\d{2})\/([a-z0-9-]+\.jpg)/;
    const match = req.body.previewLogo.match(regex);

    if (match) {
      const year = match[1];
      const month = match[2];
      const filename = match[3];

      const currentLocation = path.join(process.cwd(), 'uploads', 'temp', `${year}-${month}`, 'system', "logo", filename);

      const newLocation = path.join(process.cwd(), 'uploads', 'system', "logo");

      logo = `/backend/api/v1/logo/file/${filename}`

      fs.mkdirsSync(newLocation);
      // Copy the file to the new location
      try {
        const copyFile = util.promisify(fs.copyFile);

        await copyFile(currentLocation, path.join(newLocation, filename));
        // Optional: You might also want to delete the file from the old location after copying
        // fs.unlinkSync(currentLocation);

      } catch (error) {
        // console.error("Error copying file:", error);
        return res.status(500).json({
          success: false,
          message: "Error copying file."
        });
      }
    }

    const d = await makeDObj();

    const boardcasters = makeBoardcasters(d)
    const organization = makeBackendSettingOrganizationMain(d)


    const organizationRecord = await organization.upsertOne({
      logo,
      name: req.body.name,
      shouldApplyToTopNavMenu: req.body.shouldApplyToTopNavMenu,
    })


    //send to all sockets.
    await boardcasters.broadCastToAllSockets({
      channel: "server-change-company-branding",
      data: {
        logo: organizationRecord.data.dataValues.logo,
        name: organizationRecord.data.dataValues.name,
        shouldApplyToTopNavMenu: organizationRecord.data.dataValues.shouldApplyToTopNavMenu,
      }
    })



    return res.status(200).json({
      success: true,
      data: {
        picture: logo
      },
    })
  })
}