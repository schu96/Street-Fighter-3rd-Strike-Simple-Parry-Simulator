import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import InputBox from './subcomponent/InputBox.jsx';
import Canvas from './subcomponent/Canvas.jsx';
function App() {
  const [test, setTest] = useState(false);
  const [userInput, setUserInput] = useState([]);

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'black';

  const size = 1;
  let frameData = [0, 57, 70, 83, 97, 113];
  let active = [frameData[0]];
  let reachedSize = false;
  let start, activeAnimation;
  function animate() {
    if (!test) {
      activeAnimation = requestAnimationFrame(animate);
      tick();
    } else { cancelAnimationFrame(activeAnimation); }
  }
  function play() {
    if (!start) { start = Date.now(); } //maybe consider using a set time out
    if (!test) { animate(); }
  }
  function tick () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    active.forEach(x => {
      ctx.beginPath();
      ctx.fillStyle === '#0000ff' ? ctx.fillStyle = 'lightgreen': ctx.fillStyle = 'blue';
      ctx.rect(x, 0, size, canvas.height);
      ctx.fill();
      ctx.stroke();
      // ctx.fillRect(x, 0, size, canvas.height);
    });
    active = active.map(x => x += 5).filter(x => x < canvas.width);
    if (active.length <= frameData.length && !reachedSize) {
      setTimeout(() => {
        // console.log(frameData[active.length] - frameData[active.length - 1 < 0 ? 0 : active.length - 1]);
        active.push(0)
      }, frameData[active.length] - frameData[active.length - 1 < 0 ? 0 : active.length - 1]);
    }
    else { reachedSize = true; }
    if (active.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stop();
    }
  }
  function stop() {
    if (activeAnimation) {
      cancelAnimationFrame(activeAnimation);
      activeAnimation = undefined;
      reachedSize = false;
      active = [frameData[0]];
    }
  }
  function reset() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  return (
    <div>
      Visualizing Street Fighter 3rd Strike Parries
      <InputBox setUserInput={setUserInput} />
      <button type="submit" onClick={play}>Show frames</button>
      <button type="submit" onClick={stop}>Stop Animation</button>
      <button type="submit" onClick={reset}>Reset</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));