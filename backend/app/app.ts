//////////////////////////
///
///  Upgrade: random cookie for JWT reddis layer... first reddis layer
///
///////////////


require("dotenv").config();
import express from "express"
import http from 'http'
import socketIO from 'socket.io'
import bodyParser from "body-parser"
import formData from "express-form-data"
import cors from "cors"
import dbInitScript from "./db-init";
import multer from 'multer'
import makeFoundationAuthFunc from "./schema/backend/auth/preMain/backendAuth.func";
import makeSocketLookUp from "./schema/collaborate/_singleton/preMain/socketLookUp.ram-cache";
import socketInitScript from "./socket-init";
import makeCollaborateSameDoc from "./schema/collaborate/sameDoc/preMain/collaborateSameDoc.ram-cache";
import { dependencies } from "./schema/utils/dependencies/type/dependencyInjection.types";
import { makeDObj } from "./schema/utils/dependencies/makeDependency";
import makeBackendUserMain from "./schema/backend/user/main/backendUser.main";
import makeBackendUserProfileMain from "./schema/backend/user/main/backendUserProfile.main";
import { CallByTypeEnum } from "./schema/backend/user/preMain/scripts/userProfileSql/upsertOne.script";

const upload = multer({ dest: 'uploads/' })

const makeApp = async function () {

  const app = express();
  const server = http.createServer(app)
  const io = new socketIO.Server(server, {
    cors: {
      origin: '*',
    }
  });

  var corsOptions = {
    origin: "*",
    // origin: "http://localhost:8081",
  };

  //Add on: Anti-DDOS header.__ santization

  // app.use(cors(corsOptions));
  // var whitelist = ['http://localhost:8000', 'http://localhost:8010']
  // var whitelist = ['*']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }

  app.use(cors(corsOptions));

  // create resource directory
  app.use('/resources', express.static('public'));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // upload

  // schema and database loader
  await dbInitScript({ app })

  const d: dependencies = await makeDObj()

  io.on('connection', async (socket) => {
    const authToken = socket.handshake.query.authToken;
    try {

      //load user to socket
      const AuthFuncs = makeFoundationAuthFunc(d)
      const decodedToken = await AuthFuncs.getDataFromToken({ token: authToken });

      const userId = decodedToken.data.userId;

      const backendUser = makeBackendUserMain(d)
      const backendUserProfile = makeBackendUserProfileMain(d)

      const user = await backendUser.getOneById({
        id: userId
      })

      const userProfile = await backendUserProfile.getOneByUserId({
        userId,
      })

      const lookUp = makeSocketLookUp(d)

      await lookUp.set({
        socket: socket,
        socketId: socket.id,
        userId,
        email: user.data?.dataValues?.email,
        callByType: userProfile.data?.dataValues?.callByType as CallByTypeEnum,
        circleColor: userProfile.data?.dataValues?.circleColor,
        firstName: userProfile.data?.dataValues?.firstName,
        labelColor: userProfile.data?.dataValues?.labelColor,
        lastName: userProfile.data?.dataValues?.lastName,
        picture: userProfile.data?.dataValues?.picture,
        username: userProfile.data?.dataValues?.username,
        entities: [],
      })
      // Store userId in the socket object
      socket.userId = userId;

      // send client their id
      socket.emit('server-socket-id', {
        id: socket.id
      })

    } catch (error) {
      console.error('Error decoding authToken:', error);
      socket.disconnect(true);  // Disconnect socket if token is invalid
      return;
    }

    await socketInitScript({
      socket,
      d,
    })

    socket.on('disconnect', async () => {
      const lookUp = makeSocketLookUp(d)
      const sameDoc = makeCollaborateSameDoc(d)

      await sameDoc.socketDisconnect_removeFromEntities({
        socketId: socket.id,
      })

      await lookUp.removeBySocketId({
        socketId: socket.id,
      })
    });
  });


  // simple route - simple page pointing to both playgrounds...
  app.get("/", (req, res) => {
    res.redirect("./domain/playground");
  });


  return server
}

export default makeApp