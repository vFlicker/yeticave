import {
  HOURS_PER_DAY,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constants';
import { Timestamp } from '../types';

const normalize = (number: number) => {
  return Math.floor(number).toString().padStart(2, '0');
};

const getCurrentTimestamp = () => new Date().toISOString();

const getTimeDiff = (time1: Timestamp, time2: Timestamp) => {
  const time1InSeconds = new Date(time1).getTime() / MILLISECONDS_PER_SECOND;
  const time2InSeconds = new Date(time2).getTime() / MILLISECONDS_PER_SECOND;

  return time2InSeconds - time1InSeconds;
};

export const convertDayToMilliseconds = (days: number) => {
  return days * HOURS_PER_DAY * SECONDS_PER_HOUR * MILLISECONDS_PER_SECOND;
};

export const getTimeLeft = (endDate: Timestamp) => {
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(currentTime, endDate);

  const hh = diffInSeconds / SECONDS_PER_HOUR;
  const mm = (diffInSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE;
  const ss = diffInSeconds % SECONDS_PER_MINUTE;

  return `${normalize(hh)}:${normalize(mm)}:${normalize(ss)}`;
};

export const isTimeFinishing = (endDate: Timestamp) => {
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(currentTime, endDate);
  const hoursLeft = diffInSeconds / SECONDS_PER_HOUR;

  return hoursLeft < 12;
};
