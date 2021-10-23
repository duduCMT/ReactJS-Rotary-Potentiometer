import { useState } from "react";
import { RotaryPotentiometer } from "./components/RotaryPotentiometer/RotaryPotentiometer";
import './styles/app.css'

function App() {
  const [tensao, setTensao] = useState(0.0);
  const [angle, setAngle] = useState(0);

  return (
    <div className="container">
      <RotaryPotentiometer
        minValue={0.0}
        maxValue={5.0}
        onChange={(obj) => {
          setTensao(obj.value.toFixed(2))
          setAngle(obj.angle)
        }} />
      <h1>{tensao}v</h1>
      <h1>{angle}°</h1>
    </div>
  );
}

export default App;
