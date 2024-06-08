import {
  HOURS_PER_DAY,
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constants';
import { Timestamp } from '../types';

const normalize = (number: number) => {
  return Math.floor(number).toString().padStart(2, '0');
};

const getCurrentTimestamp = () => new Date().toISOString();

const getTimeInSeconds = (time: Timestamp) => {
  return new Date(time).getTime() / MILLISECONDS_PER_SECOND;
};

const getTimeDiff = (time1: Timestamp, time2: Timestamp) => {
  const time1InSeconds = getTimeInSeconds(time1);
  const time2InSeconds = getTimeInSeconds(time2);

  return time2InSeconds - time1InSeconds;
};

const getTimeParts = (diffInSeconds: number) => {
  const hr = diffInSeconds / SECONDS_PER_HOUR;
  const min = (diffInSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE;
  const sec = diffInSeconds % SECONDS_PER_MINUTE;

  return { hr, min, sec };
};

export const convertDayToMilliseconds = (days: number) => {
  return days * HOURS_PER_DAY * SECONDS_PER_HOUR * MILLISECONDS_PER_SECOND;
};

/**
 * Time format: hh:mm:ss.
 */
export const getTimeLeft = (endDate: Timestamp) => {
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(currentTime, endDate);

  const { hr, min, sec } = getTimeParts(diffInSeconds);

  return `${normalize(hr)}:${normalize(min)}:${normalize(sec)}`;
};

/**
 * Time format:
 * - just now
 * - N minute ago
 * - N hour ago
 * - N month/N day/N year
 */
export const getTimeAgo = (createDate: Timestamp) => {
  const getTemplate = (time: number, timeName: string) => {
    const roundedTime = Math.round(time);
    return `${roundedTime} ${timeName}${roundedTime > 1 ? 's' : ''} ago`;
  };

  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(createDate, currentTime);

  if (diffInSeconds < 1) return 'just now';

  const { hr, min, sec } = getTimeParts(diffInSeconds);

  if (diffInSeconds < SECONDS_PER_MINUTE) return getTemplate(sec, 'second');
  if (diffInSeconds < SECONDS_PER_HOUR) return getTemplate(min, 'minute');
  if (diffInSeconds < SECONDS_PER_DAY) return getTemplate(hr, 'hour');

  return Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(Date.parse(createDate));
};

export const isTimeFinishing = (endDate: Timestamp) => {
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(currentTime, endDate);
  const hoursLeft = diffInSeconds / SECONDS_PER_HOUR;

  return hoursLeft < 12;
};

export const isTimeFinished = (endDate: Timestamp) => {
  const currentTime = getCurrentTimestamp();
  const diffInSeconds = getTimeDiff(currentTime, endDate);

  return diffInSeconds < 0;
};
