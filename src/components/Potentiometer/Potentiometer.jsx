import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import bodyImg from './assets/Body.svg'
import knopImg from './assets/Knop.svg'

import './styles/potentiometer.css'

const Knop = styled.img`
  transform: rotate(${(props) => props.rotation}rad);
`

const minAngle = 2.47//97449305753796;
const maxAngle = 0.65//72696077885278;

function map_range(low1, high1, low2, high2, value) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export function Potentiometer({onChange, minValue, maxValue}) {
  const [rotation, setRotation] = useState(minAngle);
  const knopElement = useRef(null);
  let oldAngle = 0;

  function getCenter(element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 }
  }

  useEffect(() => {
    let value = 0;
    onChange(value);
  })

  function onMouseMovePotentiometer(event) {
    if(event.buttons == 1){
      let knopCenter = getCenter(knopElement.current);
      let mouseX = event.clientX// - rect.left;
      let mouseY = event.clientY// - rect.top;

      const angle = Math.atan2(mouseY - knopCenter.y, mouseX - knopCenter.x).toFixed(2);

      if((angle > oldAngle + 0.10 || angle < oldAngle - 0.10 ) && 
        (angle > minAngle && angle < Math.PI) || (angle < maxAngle && angle < Math.PI)){
        oldAngle = angle
        setRotation(angle)
      }
      //console.log(oldAngle)
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