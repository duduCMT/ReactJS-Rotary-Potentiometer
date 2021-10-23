import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import bodyImg from './assets/Body.svg'
import knopImg from './assets/Knop.svg'

import './styles/potentiometer.css'

const Knop = styled.img`
  transform: rotate(${(props) => props.rotation}deg);
`
const fistAnglePosition = 140;
const lastAnglePosition = 40;

function mapRange(low1, high1, low2, high2, value) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

let oldAngle = 0;

export function Potentiometer({ onChange, minValue, maxValue }) {
  const [rotation, setRotation] = useState(fistAnglePosition);
  const knopElement = useRef(null);

  function getCenter(element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 }
  }

  function convertedToRealAngle(angle) {
    if (oldAngle >= fistAnglePosition && oldAngle < 180) {
      return parseInt(mapRange(140, 180, 0, 40, angle));
    } else if (oldAngle <= lastAnglePosition && oldAngle < 180) {
      return parseInt(mapRange(-180, 40, 40, 260, angle));
    }
  }

  useEffect(() => {
    let realAngle = convertedToRealAngle(oldAngle);
    let value = mapRange(0, 260, minValue, maxValue, realAngle);
    onChange({ realAngle, value });
  })

  function onMouseMovePotentiometer(event) {
    if (event.buttons === 1) {
      let knopCenter = getCenter(knopElement.current);
      let mouseX = event.clientX// - rect.left;
      let mouseY = event.clientY// - rect.top;

      const angle = (Math.atan2(mouseY - knopCenter.y, mouseX - knopCenter.x) * (180 / Math.PI)).toFixed(2);

      if ((angle >= fistAnglePosition && angle < 180) || (angle <= lastAnglePosition && angle > -180)) {
        oldAngle = angle
        setRotation(angle)
      }
    }
  }

  return (
    <div className="potentiometer"
      onMouseMove={onMouseMovePotentiometer}
    >
      <img src={bodyImg} alt="" />
      <Knop rotation={rotation} src={knopImg} ref={knopElement} />
    </div>
  )
}