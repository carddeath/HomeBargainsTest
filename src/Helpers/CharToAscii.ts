export const charToAscii = (value: string): number => {
  let asciiValue: number = 0;

  for (let i: number = 0; i < value.length; i++) {
    asciiValue += value.charCodeAt(i);
  }

  return asciiValue;
};
