import { useState } from "react";
import { Potentiometer } from "./components/Potentiometer/Potentiometer";
import './styles/app.css'

function App() {
  const [tensao, setTensao] = useState(0.0);

  return (
    <div className="container">
      <Potentiometer
        minValue={0.0}
        maxValue={5.0}
        onChange={(obj) => {
          setTensao(obj.value.toFixed(2))
        }} />
      <h1>{tensao}v</h1>
    </div>
  );
}

export default App;
