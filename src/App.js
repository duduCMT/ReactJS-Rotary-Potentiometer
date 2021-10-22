import { Potentiometer } from "./components/Potentiometer/Potentiometer";

function App() {
  return (
    <Potentiometer minValue={0.0} maxValue={5.0} onChange={(value) => {
      //console.log(value)
    }}/>
  );
}

export default App;
