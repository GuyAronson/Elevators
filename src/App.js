import Building from "./components/Building";
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Building floorsAmount={10} elevatorsAmount={5} />
    </div>
  );
}

export default App;
