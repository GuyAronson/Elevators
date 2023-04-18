import Building from "./components/Building";
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Building floorsAmount={8} elevatorsAmount={3} />
    </div>
  );
}

export default App;
