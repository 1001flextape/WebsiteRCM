import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendNotificationMain from "../../../backend/notification/main/backendNotification.main";
import { notificationIconEnum, notificationTypeEnum } from "../../../backend/notification/preMain/scripts/sql/addOne.script";
import makeMeeting from "../../_singleton/preMain/meetings.ram-cache";

type input = {
  socket: any,
  d: dependencies
}

export default ({ socket, d }: input) => {
  socket.on('server-meeting-invite-user', async (data) => {
    const dbTransaction = await d.db.transaction()

    const notification = makeBackendNotificationMain({
      db: d.db,
      dbTransaction,
      errorHandler: d.errorHandler,
      loggers: d.loggers
    })

    const result = await notification.addOne({
      userId: data.userId,
      message: "You have been invited to a meeting.",
      action: {
        type: notificationTypeEnum.MEETING,
        icon: notificationIconEnum.MEETING,
        data: {
          meetingId: data.meetingId,
        }
      }
    })

    if (result.success) {
      dbTransaction.commit()
    } else {
      dbTransaction.rollback()
    }
  });
}