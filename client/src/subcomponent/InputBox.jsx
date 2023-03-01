import React, { useState, useEffect } from 'react';

function InputBox() {
  const [clicked, setClicked] = useState(false);
  const [input, setInput] = useState([]);
  const [parry, setParry] = useState(0);

  function keyDown (e) {
    if (e.repeat) {
      return;
    }
    setParry(0);
    setInput([[e.key, e.timeStamp], ...input]);
  }
  function keyUp (e) {
    // console.log(e.key, e.timeStamp);
    console.log('I am the timestamp difference', e.timeStamp - input[0][1]);
    setInput([[`released ${e.key}`, e.timeStamp], ...input]);
    setParry(e.timeStamp - input[0][timeStamp]);
  }
  function focusHandler(e) {
    console.log('this element is now in focus', e);
  }
  function showInputs() {
    if ()
    return input.map((item) => {
      return (
      <div>
        {item[0]} {item[1]} {parry !== 0 ? `this is parry ${parry}` : null}
      </div>
      )
    })
  }
  return (
    <div className='box' onClick={focusHandler} onKeyDown={keyDown} onKeyUp={keyUp} tabindex='0'>
      <div className='boxText'>Parry Timing</div>
      {showInputs()}
    </div>
  )
};

export default InputBox;