import React, { useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding-bottom: 10px;
  height: 85px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 80%;
  height: 10px;
  position: relative;
`;


const Track = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #f0f8ff;
`;

interface RangeProps {
  left: number;
  right: number;
}

const Range = styled.div<RangeProps>`
  position: absolute;
  z-index: 2;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #4a90e2;
  opacity: 0.65;
`;

interface ThumbProps {
  side: 'left' | 'right';
  percent: number;
}

const Thumb = styled.div<ThumbProps>`
  position: absolute;
  z-index: 3;
  height: 25px;
  width: 25px;
  background-color: #4a90e2;
  border-radius: 50%;
  opacity: 1;
  ${props => props.side === 'left' ? `left: ${props.percent}%` : `right: ${props.percent}%`};
  transform: translate${props => props.side === 'left' ? '(-12px, -7px)' : '(12px, -7px)'};
`;

const Slider = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
`;

const RangeInput = styled.input`
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  -webkit-appearance: none;
  opacity: 0;
  pointer-events: none;

  &::-moz-range-thumb {
    pointer-events: all;
    width: 5vh;
    height: 5vh;
    -webkit-appearance: none;
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 5vh;
    height: 5vh;
    -webkit-appearance: none;
    cursor: pointer;
  }
  &::-ms-thumb {
    pointer-events: all;
    width: 5vh;
    height: 5vh;
    -webkit-appearance: none;
    cursor: pointer;
  }
`;

interface MarkerProps {
  percent: number;
}

const Marker = styled.div<MarkerProps>`
  position: absolute;
  top: 100%;
  padding-top: 16px;
  font-size: 13px;
  color: #555;
  letter-spacing: 0.05em;
  transform: translateX(-50%);
  left: ${props => props.percent}%;

  &:after {
    content: '';
    width: 1px;
    height: 8px;
    background: #d2d2d2;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;


interface IntegerRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onMinValueChange: (min: number) => void;
  onMaxValueChange: (max: number) => void;
};

const IntegerRangeSlider: React.FC<IntegerRangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialMin,
  initialMax,
  onMinValueChange,
  onMaxValueChange,
}) => {

  const [minValue, setMinValue] = useState<number>(initialMin || min);
  const [maxValue, setMaxValue] = useState<number>(initialMax || max);

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (val <= maxValue) {
      setMinValue(val);
      onMinValueChange(val);
    }
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (val >= minValue) {
      setMaxValue(val);
      onMaxValueChange(val);
    }
  };

  const renderMarkers = () => {
    let markers = [];
    for (let i = min; i <= max; i += step) {
      markers.push(<Marker percent={100 * (i - min) / (max - min)}>{i}</Marker>);
    }
    return markers;
  };

  const leftPercent = 100 * (minValue - min) / (max - min);
  const rightPercent = 100 * (max - maxValue) / (max - min);

  return (
    <Root>
      <SliderContainer>
        <RangeInput
          type='range'
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinValueChange}
        />
        <RangeInput
          type='range'
          min={min}
          step={step}
          max={max}
          value={maxValue}
          onChange={handleMaxValueChange}
        />

        <Slider>
          <Track />
          <Range left={leftPercent} right={rightPercent} />
          <Thumb side='left' percent={leftPercent} />
          <Thumb side='right' percent={rightPercent} />
        </Slider>

        {renderMarkers()}
      </SliderContainer>
    </Root>
  );
}

export default IntegerRangeSlider;