// eslint-disable-next-line max-statements
export const getDuration = (time: string): string => {
  const durationInMillisecond = Date.now() - stringToMillisecond(time);
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

export const stringToMillisecond = (time: string): number => Date.parse(time);
