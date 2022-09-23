// eslint-disable-next-line max-statements
export const getDuration = (time: Date): string => {
  const durationInMillisecond = Date.now() - time.getTime();
  if (durationInMillisecond < 1000) {
    return '0s';
  }

  const durationInSecond = Math.floor(durationInMillisecond / 1000);
  if (durationInSecond < 60) {
    return `${durationInSecond}s`;
  }

  const durationInMinute = Math.floor(durationInSecond / 60);
  if (durationInMinute < 60) {
    return `${durationInMinute}m`;
  }

  const durationInHour = Math.floor(durationInMinute / 60);
  if (durationInHour < 24) {
    return `${durationInHour}h`;
  }

  const durationInDay = Math.floor(durationInHour / 24);
  return `${durationInDay}d`;
};

export const mdy = (time?: Date): string => {
  if (!time) return '';
  const year = time.getFullYear();
  let month = (1 + time.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;
  let day = time.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;
  return `${month}/${day}/${year}`;
};

export const isValidTimestamp = (ts: string): boolean => !isNaN(new Date(parseInt(ts, 10)).getTime());
