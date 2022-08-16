export const convertSecondToToeicTime = (value: number) => {
  const hour = (() => {
    const newValue = Math.floor(Math.floor(value / 60) / 60);
    if (newValue < 10) {
      return `0${newValue}`;
    }
    return newValue;
  })();
  const minute = (() => {
    const newValue = Math.floor(value / 60) % 60;
    if (newValue < 10) {
      return `0${newValue}`;
    }
    return newValue;
  })();
  const second = (() => {
    const newValue = value % 60;
    if (newValue < 10) {
      return `0${newValue}`;
    }
    return newValue;
  })();
  return `${hour}:${minute}:${second}`;
};

export const monthToDateRange = (value: string) => {
  let lastDay = '28';

  if (value?.split('-')[1] === '01') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '02') {
    lastDay = '28';
  } else if (value?.split('-')[1] === '03') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '04') {
    lastDay = '30';
  } else if (value?.split('-')[1] === '05') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '06') {
    lastDay = '30';
  } else if (value?.split('-')[1] === '07') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '08') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '09') {
    lastDay = '30';
  } else if (value?.split('-')[1] === '10') {
    lastDay = '31';
  } else if (value?.split('-')[1] === '11') {
    lastDay = '30';
  } else if (value?.split('-')[1] === '12') {
    lastDay = '31';
  }

  return `${value}-01 ~ ${value}-${lastDay}`;
};
