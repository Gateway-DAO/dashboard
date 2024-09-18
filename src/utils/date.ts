import { DATE_HOUR_FORMAT } from '@/constants/date';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatDate(date?: dayjs.ConfigType) {
  return dayjs(date).format(DATE_HOUR_FORMAT);
}

export function formatDateDifference(date: dayjs.ConfigType) {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diffInDays = targetDate.diff(now, 'day', true);

  if (diffInDays >= 365) {
    const years = targetDate.diff(now, 'year');
    return years === 1 ? 'in 1 year' : `in ${years} years`;
  } else if (diffInDays >= 30) {
    const months = targetDate.diff(now, 'month');
    return months === 1 ? 'in 1 month' : `in ${months} months`;
  } else if (diffInDays >= 1) {
    const days = Math.floor(diffInDays);
    return days === 1 ? 'in 1 day' : `in ${days} days`;
  } else {
    const diffInHours = targetDate.diff(now, 'hour', true);
    if (diffInHours >= 1) {
      const hours = Math.floor(diffInHours);
      return hours === 1 ? 'in 1 hour' : `in ${hours} hours`;
    } else {
      return 'in less than 1 hour';
    }
  }
}

export const formatTimeUntilAvailable = (
  date: dayjs.ConfigType,
  days: number
) => {
  const now = dayjs();
  const targetDate = dayjs(date).add(days, 'day');
  const diffInDays = targetDate.diff(now, 'day', true);

  if (diffInDays >= days) {
    const years = targetDate.diff(now, 'year');
    return years === 1 ? 'in 1 year' : `in ${years} years`;
  } else if (diffInDays >= 30) {
    const months = targetDate.diff(now, 'month');
    return months === 1 ? 'in 1 month' : `in ${months} months`;
  } else if (diffInDays >= 1) {
    const days = Math.floor(diffInDays);
    return days === 1 ? 'in 1 day' : `in ${days} days`;
  } else {
    const diffInHours = targetDate.diff(now, 'hour', true);
    if (diffInHours >= 1) {
      const hours = Math.floor(diffInHours);
      return hours === 1 ? 'in 1 hour' : `in ${hours} hours`;
    } else {
      return 'in less than 1 hour';
    }
  }
};
