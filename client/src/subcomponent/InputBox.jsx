import React, { useState, useEffect } from 'react';

function InputBox({setUserInput}) {
  const [parry, setParry] = useState(0);
  const [objInput, setObjInput] = useState({'d': 0, 's': 0, 'ArrowRight': 0, 'ArrowLeft': 0});
  const [pressed, setPressed] = useState('');
  //To-do: deal with multiple key presses for high low parries;
  function keyDown (e) {
    if (e.repeat || !['d', 's', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
      return;
    }
    const copy = {...objInput};
    copy[e.key] = e.timeStamp;
    setObjInput(copy);
    setPressed(e.key);
  }
  function keyUp (e) {
    if (!['d', 's', 'ArrowRight', 'ArrowDown'].includes(e.key))  {
      return;
    }
    const number = e.timeStamp - objInput[e.key];
    setParry(number);
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
      {/* {showInputs()} */}
      <div className='pressedKey'>Key Pressed {pressed}</div>
    </div>
  )
};

export default InputBox;