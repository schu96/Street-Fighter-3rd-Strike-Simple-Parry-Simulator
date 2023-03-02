import React, { useState, useEffect } from 'react';

function InputBox({setUserInput, frameData}) {
  const [parry, setParry] = useState(0);
  const [objInput, setObjInput] = useState({'d': 0, 's': 0, 'ArrowRight': 0, 'ArrowLeft': 0});
  const [pressed, setPressed] = useState('');
  const [noInput, setNoInput] = useState(0); //should store the frames between keyDown and keyUp
  const [timing, setTiming] = useState([0]); //accumulative frame time between inputs
  const [inputKD, setInputKD] = useState(0); //should be in ms to subtract difference
  const [inputKU, setInputKU] = useState(0); //separate KU and KD times in ms
  const [listen, setListen] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const canvas = document.getElementsByTagName("canvas")[1];
  const ctx = canvas.getContext("2d");
  let active = [timing[0]];
  let [size, reachedSize] = [1, false];
  let activeAnimation;
  function show() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timing.forEach(x => {
      ctx.beginPath();
      ctx.fillRect(x, 0, size, canvas.height);
    });
  }
  // function play() {
  //   if (timing.length !== frameData.length) {
  //     return;
  //   }
  //   activeAnimation = requestAnimationFrame(play);
  //   tick();
  // }
  // function tick() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   active.forEach(x => {
  //     ctx.beginPath();
  //     ctx.fillStyle = 'orange';
  //     ctx.fillRect(x, 0, size, canvas.height);
  //   })
  //   active = active.map(x => x += 5).filter(x => x < canvas.width);
  //   if (active.length <= timing.length && !reachedSize) {
  //     setTimeout(() => {
  //       active.push(0);
  //     }, timing[active.length] - timing[active.length - 1 < 0 ? 0 : active.length - 1]);
  //   } else { reachedSize = true; }
  //   if (active.length === 0 ){
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     stop();
  //   }
  // }
  // function stop() {
  //   cancelAnimationFrame(activeAnimation);
  //   activeAnimation = undefined;
  //   reachedSize = false;
  //   active = [0];
  // }
  function keyDown (e) {
    if (e.repeat || !['d', 's', 'ArrowRight', 'ArrowDown'].includes(e.key)) { return; }
    if (!listen) { return };
    const copy = {...objInput};
    copy[e.key] = e.timeStamp;
    setObjInput(copy);
    setPressed(e.key);
    setNoInput(Math.floor((e.timeStamp - inputKD) / 16.67));
    setInputKD(e.timeStamp);
  }

  function keyUp (e) {
    if (!['d', 's', 'ArrowRight', 'ArrowDown'].includes(e.key))  { return; }
    if (!listen) { return };
    setInputKU(e.timeStamp);
    const number = e.timeStamp - objInput[e.key];
    setParry(number);
    if (timing.length < frameData.length) {
      setTiming([...timing, timing[timing.length - 1] + Math.floor(number / 16.67) + noInput]);
      setNoInput(Math.floor((inputKD - inputKU) / 16.67));
    } else {
      setUserInput(timing);
      setListen(false);
      console.log(timing, timing.length, frameData.length);
      show();
    }
  }
  useEffect(() => {
    /*
    countdown idea from
    https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3
    */
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown, listen]);

  function start (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (countdown === 0) {
      setInputKD(e.timeStamp + 3000);
      setListen(true);
      setCountdown(3);
    }
  }

  function reset () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTiming([0]);
  }
  return (
    <div className='box' onKeyDown={keyDown} onKeyUp={keyUp} tabIndex='0'>
      <div className='boxText'>{`Parry timing is ${parry}ms`} {parry > 320 ? 'too slow' : null}</div>
      <div className='pressedKey'>Key Pressed {pressed}</div>
      <div className='frameConversion'>ms to frames: {Math.floor(parry/16.67)}</div>
      <div className='noInput'>frames between inputs: {noInput} </div>
      <div className='countdown'>{!listen ? 'Press Start input record to countdown': countdown }</div>
      <button type='submit' onClick={start} disabled={timing.length === frameData.length}>Start recording</button>
      <button type='submit' onClick={show}>Show my inputs</button>
      <button type='submit' onClick={reset}>Reset</button>
    </div>
  )
};

export default InputBox;