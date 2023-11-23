import moment from "moment";
import momentTz from "moment-timezone";

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
export const DEFAULT_TIME_FMT = "yyyy-MM-DD HH:mm:ss";
export const DB_TIME_FMT = "YYYY-MM-DDTHH:mm:ss";
export const DD_HH_FMT = "DD HH:mm";
export const relativeTime = (timestamp) => moment(timestamp).fromNow();
export const changeDateFmtUtc = (date, fmt) => moment(date).utc().format(fmt);
const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const changeDateFmt = (date, fmt) => moment(date).format(fmt);
export const convertEpochToHumam = (epochTime, fmt = "MM/DD") =>
  moment(epochTime).format(fmt);
export const convertTimeToLocalTz = (date, fmt) =>
  moment(date).tz(localTz).format(fmt);
