import bodyImg from './assets/Body.svg'
import knopImg from './assets/Knop.svg'

import './styles/potentiometer.css'

export function Potentiometer(){
  return(
    <div class="potentiometer">
      <img src={bodyImg} alt="" />
      <img src={knopImg} alt="" />
    </div>
  ) 
}