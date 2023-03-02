import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import InputBox from './subcomponent/InputBox.jsx';
import Canvas from './subcomponent/Canvas.jsx';
function App() {
  const [playing, setPlaying] = useState(false);
  const [userInput, setUserInput] = useState([]);

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'blue';

  let frameData = [0, 57, 70+16, 83+16, 97+16, 113+16];
  let active = [frameData[0]];
  let [size, reachedSize] = [1, false];
  let activeAnimation;

  function play() {
    activeAnimation = requestAnimationFrame(play);
    tick();
  }
  function tick () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    active.forEach(x => {
      ctx.beginPath();
      ctx.fillStyle === '#0000ff' ? ctx.fillStyle = 'lightgreen': ctx.fillStyle = 'blue';
      ctx.rect(x, 0, size, canvas.height);
      ctx.fill();
      ctx.stroke();
    });
    active = active.map(x => x += 10).filter(x => x < canvas.width);
    if (active.length <= frameData.length && !reachedSize) {
      setTimeout(() => {
        active.push(0);
        // console.log(frameData[active.length] - frameData[active.length - 1 < 0 ? 0 : active.length - 1]);
      }, frameData[active.length] - frameData[active.length - 1 < 0 ? 0 : active.length - 1]);
    }
    else { reachedSize = true; }
    if (active.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stop();
    }
  }
  function stop() {
    cancelAnimationFrame(activeAnimation);
    activeAnimation = undefined;
    reachedSize = false;
    active = [frameData[0]];
  }
  function reset() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  function show() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameData.forEach(x => {
      ctx.fillRect(x, 0, size, canvas.height);
    });
  }
  return (
    <div className="main">
      {/* <Canvas /> */}
      <InputBox setUserInput={setUserInput} frameData={frameData}/>
      <button type="submit" onClick={play}>Animate frames</button>
      <button type="submit" onClick={stop}>Stop Animation</button>
      <button type="submit" onClick={reset}>Clear</button>
      <button type="submit" onClick={show}>Show frames</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));