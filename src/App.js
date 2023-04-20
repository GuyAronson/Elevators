import Building from "./components/Building";
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 
        Recommended to use 3-10 floors
        And 4-10 elevators
      */}
      <Building floorsAmount={3} elevatorsAmount={10} />
    </div>
  );
}

export default App;
