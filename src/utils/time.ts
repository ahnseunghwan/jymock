export const convertSecondToToeicTime = (value: number) => {
  const minute = (() => {
    const newValue = Math.floor(value / 60);
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
  return `${minute}:${second}`;
};
