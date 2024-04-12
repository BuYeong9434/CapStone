import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [student, setStudent] = useState([0, 0, 0, 0, 0, 0, 0]);

  function update(i, value) {
    let copy = [...student];
    copy[i] = value;
    setStudent(copy);
    console.log(student[0]);
  }

  return (
    <div className="App">
      <form>
        <div className="input-container">
          <div><p>기초</p> <input type="number" className="credit-input" id="credit-0" onChange={ (e) => { update(0, e.target.value) } }/></div>
          <div><p>대교</p> <input type="number" className="credit-input" id="credit-1" onChange={ (e) => { update(1, e.target.value) } }/></div>
          <div><p>균교</p> <input type="number" className="credit-input" id="credit-2" onChange={ (e) => { update(2, e.target.value) } }/></div>
          <div><p>전필</p> <input type="number" className="credit-input" id="credit-3" onChange={ (e) => { update(3, e.target.value) } }/></div>
          <div><p>전선</p> <input type="number" className="credit-input" id="credit-4" onChange={ (e) => { update(4, e.target.value) } }/></div>
          <div><p>심화</p> <input type="number" className="credit-input" id="credit-5" onChange={ (e) => { update(5, e.target.value) } }/></div>
          <div><p>자선</p> <input type="number" className="credit-input" id="credit-6" onChange={ (e) => { update(6, e.target.value) } }/></div>
        </div>
      </form>


    </div>
  );
}

export default App;
