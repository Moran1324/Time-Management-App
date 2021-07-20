import { WeekDays } from './values';

export const getDayIndex = (dateInMs) => {
  const shortDayNames = WeekDays.map((day) => day.shortName);
  const day = new Date(dateInMs);
  return shortDayNames.indexOf(day.toDateString().split(' ')[0]);
};

export const formatDate = (dateInMs = Date.now()) => {
  const [month, day, year] = new Date(dateInMs)
    .toLocaleDateString()
    .split('/');
  const dateStr = [day, month, year].join('/');
  return `${dateStr}`;
};

export const formatDateTime = (dateInMs = Date.now()) => {
  const [month, day, year] = new Date(dateInMs)
    .toLocaleDateString()
    .split('/');
  const dateStr = [day, month, year].join('/');
  const hourStr = new Date(dateInMs)
    .toString()
    .split(' ')
    .slice(4, 5)
    .join(' ');
  return `${dateStr} ${hourStr}`;
};
