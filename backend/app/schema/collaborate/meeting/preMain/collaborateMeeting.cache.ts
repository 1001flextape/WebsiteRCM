import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types"
import getAllMeetings from "./collaborateMeetingCache/scripts/getAllMeetings.script"
import getMeetingById from "./collaborateMeetingCache/scripts/getMeetingById.script"
import getMeetingsForUrl from "./collaborateMeetingCache/scripts/getMeetingsForUrl.script"
import getOnlineUsersNotInMeeting from "./collaborateMeetingCache/scripts/getOnlineUsersNotInMeeting.script"
import getUsersForMeeting from "./collaborateMeetingCache/scripts/getUsersForMeeting.script"

export default function makeCollaborateMeeting(d: dependencies) {
  return {
    getAllMeetings: getAllMeetings(d),
    getMeetingById: getMeetingById(d),
    getMeetingsForUrl: getMeetingsForUrl(d),
    getOnlineUsersNotInMeeting: getOnlineUsersNotInMeeting(d),
    getUsersForMeeting: getUsersForMeeting(d) 
  }
}