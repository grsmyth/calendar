import React, { useState } from 'react';
import { returnRed, returnBlue, returnBlack } from '../../utils';
import './slider.scss';

const maxRange = '150';
const minRange = '0';

function Slider({ label, option, update, startValue }) {
  const [value, onChange] = useState(startValue);
  const changeValue = ({ target }) => {
    onChange(target.value);
    update(target.value);
  };

  const equalValue = () => (255 * (maxRange - value)) / maxRange;

  let rgb = [0, 0, 0];
  if (option === 'red') {
    rgb = returnRed(value);
    // eslint-disable-next-line no-undef
    document.documentElement.style.setProperty(
      '--thumb-color-red',
      `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    );
  }

  if (option === 'blue') {
    rgb = returnBlue(value);
    // eslint-disable-next-line no-undef
    document.documentElement.style.setProperty(
      '--thumb-color-blue',
      `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    );
  }

  if (option === 'black') {
    rgb = returnBlack(value);
    // eslint-disable-next-line no-undef
    document.documentElement.style.setProperty(
      '--thumb-color-black',
      `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    );
  }

  const breakColor = () => {
    if (option === 'red') {
      return `linear-gradient(to right, white, red, rgb(155,0,0))`;
    }
    if (option === 'blue') {
      return `linear-gradient(to right, white, blue, rgb(0,0,155))`;
    }

    return `linear-gradient(to right, white, black)`;
  };

  // eslint-disable-next-line no-undef
  document.documentElement.style.setProperty(
    '--thumb-color',
    `rgb(${255 - equalValue()}, ${255 - equalValue()}, ${255 - equalValue()})`
  );

  return (
    <>
      <div className={`${option} sliderContainer`}>
        <p>{label}</p>
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={value}
          step="1"
          className="slider"
          id="myRange"
          onChange={changeValue}
          style={{
            backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            backgroundImage: `${breakColor()}`,
          }}
        />
      </div>
    </>
  );
}

export default Slider;
