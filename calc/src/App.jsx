import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [operation, setOperation] = useState(null);

  const handleClick = (num) => {
    setValue(num);
  };

  const handleOperation = (op) => {
    setOperation(op);
    setCount(value);
    setValue(0);
  };

  const calculate = () => {
    let result = count;

    switch (operation) {
      case "+":
        result = count + value;
        break;
      case "-":
        result = count - value;
        break;
      case "x":
        result = count * value;
        break;
      case "/":
        result = count / value;
        break;
      default:
        result = count;
    }

    setCount(result);
    setValue(0);
    setOperation(null);
  };

  return (
    <>
      <div style={{ backgroundColor: "black", width: "250px", padding: "10px" }}>
        <h2 style={{ color: "white" }}>This is our calc</h2>
        <h3 style={{ color: "lime" }}>{value !== 0 ? value : count}</h3>

        {[9,8,7,6,5,4,3,2,1,0].map(num => (
          <button key={num} style={{ margin: "10px" }} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: "black", width: "250px", padding: "10px" }}>
        {["+","-","/","x"].map(operator => (
          <button 
            key={operator} 
            style={{ margin: "6px" }} 
            onClick={() => handleOperation(operator)}
          >
            {operator}
          </button>
        ))}

        <button 
          style={{ fontSize:"20px", width:"133px", backgroundColor:"green" }} 
          onClick={calculate}
        >
          =
        </button>

        <h3 style={{ color: "white" }}>The answer is {count}</h3>
      </div>
    </>
  );
}

export default App;
