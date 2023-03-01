import React, { useState, useEffect } from 'react';

function InputBox() {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState([]);
  const [parry, setParry] = useState([]);
  //To-do: deal with multiple key presses for high low parries;
  function keyDown (e) {
    if (e.repeat || !['d', 's'].includes(e.key)) {
      return;
    }
    setInput([[e.key, e.timeStamp], ...input]);
  }
  function keyUp (e) {
    if (!['d','s'].includes(e.key))  {
      return;
    }
    console.log('I am the timestamp difference', e.timeStamp - input[0][1]);
    setInput([[`released ${e.key}`, e.timeStamp], ...input]);
    setParry(e.timeStamp - input[0][1]);
  }

  function showInputs() {
    return input.map((item) => {
      return (
        <div>
          {item[0]} {item[1]}
        </div>
      )
    })
  }

  return (
    <div className='box' onKeyDown={keyDown} onKeyUp={keyUp} tabIndex='0'>
      <div className='boxText'>{`Parry timing is ${parry}ms`} {parry > 320 ? 'too slow' : null}</div>
      {showInputs()}
    </div>
  )
};

export default InputBox;