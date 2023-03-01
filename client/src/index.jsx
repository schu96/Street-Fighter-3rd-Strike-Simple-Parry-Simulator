import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import InputBox from './subcomponent/InputBox.jsx';
function App() {
  const [test, setTest] = useState(0);


  return (
    <div>
      This should show up on localhost:3000
      <InputBox />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));