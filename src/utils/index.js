const breakPoint = 100;
const maxRange = 150;

export const modifyValue = (value) => {
  if (value > breakPoint) {
    return 0;
  }
  return (255 * (breakPoint - value)) / breakPoint;
};

export const postBar = (value) => {
  if (value > breakPoint) {
    return 255 - 2 * (value - breakPoint);
  }

  return 255;
};

const equalValue = (value) => (255 * (maxRange - value)) / maxRange;

export const returnRed = (value) => [postBar(value), modifyValue(value), modifyValue(value)];
export const returnBlue = (value) => [modifyValue(value), modifyValue(value), postBar(value)];
export const returnBlack = (value) => [equalValue(value), equalValue(value), equalValue(value)];
export const returnRGB = (rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
