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
  const [activeAnimation, setActiveAnimation] = useState(undefined);
  const [intervalId, setIntervalId] = useState(null);
  const [timerButton, setTimerButton] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(undefined);

  const canvas = document.getElementsByTagName("canvas")[1];
  const ctx = canvas.getContext("2d");
  let active = [timing[0]];
  let [size, reachedSize] = [1, false];

  useEffect(() => {
    if (timing.length !== 1) {
      show();
    }
  }, [timing]);

  useEffect(() => {
    if (countdown === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
      setInputKD(inputKD + 3000);
      clearInterval(intervalId);
      setListen(true);
    }
  }, [countdown]);

  function show() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timing.forEach(x => {
      ctx.fillRect(x, 0, size, canvas.height);
    });
  }
  // function play() {
  //   if (timing.length !== frameData.length) {
  //     return;
  //   }
  //   setActiveAnimation(requestAnimationFrame(play));
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
    const newArr = [...timing, timing[timing.length - 1] + Math.floor(number/ 16.67) + noInput];
    setTiming(newArr);
    if (newArr.length === frameData.length) {
      setUserInput(newArr);
      setListen(false);
      setTimerButton(false);
      setCountdown(3);
      cancelAnimationFrame(scanAnimation);
      setScanAnimation(undefined);
    } else {
      setNoInput(Math.floor((inputKD - inputKU) / 16.67));
    }
  }
  function timer (e) {
    setInputKD(e.timeStamp);
    setTimerButton(true);
    if (countdown > 0) {
      const id = setInterval(() => setCountdown(countdown => countdown - 1), 1000);
      setIntervalId(id);
    }
  }

  let [x, speed, isBottom] = [0, 1.15, false];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#07C';
    ctx.lineCap = 'round';
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#07C";
    ctx.fillRect(x, 0, size, canvas.height);

    if (!isBottom && x < canvas.width - 14) x += speed;
    else if (x === canvas.width - 14) isBottom = true;

    if (isBottom && x > 4) x -= speed;
    else if (x === 4) isBottom = false;
    const scanline = requestAnimationFrame(draw);
    setScanAnimation(scanline);
  }

  function reset () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTiming([0]);
  }

  return (
    <div className='box' onKeyDown={keyDown} onKeyUp={keyUp} tabIndex='0'>
      <div className='boxText'>{`Parry timing is ${parry}ms`} {parry > 320 ? 'too slow' : null}</div>
      <div className='pressedKey'>Key pressed: {pressed}</div>
      <div className='frameConversion'>ms to frames: {Math.floor(parry/16.67)}</div>
      <div className='noInput'>frames between inputs: {noInput} </div>
      <br/>
      <div className='countdown'>{!timerButton ? 'Press Start input record to countdown': countdown }</div>
      <br/><br/>
      <button type='submit' onClick={timer} disabled={timerButton || timing.length > 1}>Start recording</button>
      <button type='submit' onClick={show}>Show my inputs</button>
      <button type='submit' onClick={reset}>Reset</button>
    </div>
  )
};

export default InputBox;