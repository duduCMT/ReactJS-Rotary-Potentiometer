import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import bodyImg from './assets/Body.svg'
import knopImg from './assets/Knop.svg'
import { mapRange } from './RemapRange';
import { getCenter } from './CalcPosition';

import './styles/potentiometer.css'

const Knop = styled.img.attrs(({ rotation }) => ({
  style: {
    transform: `rotate(${rotation}deg)`
  }
}))`
`

const fistAnglePosition = 140;
const lastAnglePosition = 40;
let oldAngle = fistAnglePosition;

export function Potentiometer({ onChange, minValue, maxValue }) {
  const [rotation, setRotation] = useState(fistAnglePosition);
  const knopElement = useRef(null);

  
  function convertedToRealAngle(angle) {
    if (oldAngle >= fistAnglePosition && oldAngle < 180) {
      return parseInt(
        mapRange(
          fistAnglePosition, 180, 0, 40, angle
        )
      );
    } else if (oldAngle <= lastAnglePosition && oldAngle < 180) {
      return parseInt(
        mapRange(
          -180, lastAnglePosition, 40, 260, angle
        )
      );
    }
  }

  useEffect(() => {
    let angle;
    let realAngle = convertedToRealAngle(oldAngle);
    let value = mapRange(0, 260, minValue, maxValue, realAngle);
    
    if(realAngle < 5){
      angle = 0;
      value = minValue;
      onChange({ angle, realAngle, value });  
    } else if(realAngle > 255) {
      angle = 260;
      value = maxValue;
      onChange({ angle, realAngle, value });  
    } else {
      angle = realAngle;
      onChange({ angle, realAngle, value });
    }
  }, [rotation, onChange, minValue, maxValue])

  function onMouseMovePotentiometer(event) {
    if (event.buttons === 1) {
      let knopCenter = getCenter(knopElement.current);
      let mouseX = event.clientX;
      let mouseY = event.clientY;

      const angle = (Math.atan2(mouseY - knopCenter.y, mouseX - knopCenter.x) * (180 / Math.PI));

      if ((angle >= fistAnglePosition && angle < 180) || (angle <= lastAnglePosition && angle > -180)) {
        oldAngle = angle
        setRotation(angle)
      }
    }
  }

  return (
    <div 
      className="potentiometer"
      onMouseMove={onMouseMovePotentiometer}
    >
      <img src={bodyImg} alt="" />
      <Knop rotation={rotation} src={knopImg} ref={knopElement} />
    </div>
  )
}