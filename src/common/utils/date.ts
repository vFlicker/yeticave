import {
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../constants';
import { Timestamp } from '../types';

const normalize = (number: number) => {
  return Math.floor(number).toString().padStart(2, '0');
};

export const getHumanReadableTime = (date: Timestamp) => {
  const currentDateInSeconds = new Date().getTime() / MILLISECONDS_PER_SECOND;
  const endDateInSeconds = new Date(date).getTime() / MILLISECONDS_PER_SECOND;
  const diffInSeconds = endDateInSeconds - currentDateInSeconds;

  const hh = diffInSeconds / SECONDS_PER_HOUR;
  const mm = (diffInSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE;
  const ss = diffInSeconds % SECONDS_PER_MINUTE;

  return `${normalize(hh)}:${normalize(mm)}:${normalize(ss)}`;
};
