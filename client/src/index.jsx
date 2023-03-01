import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import InputBox from './subcomponent/InputBox.jsx';
import Canvas from './subcomponent/Canvas.jsx';
function App() {
  const [test, setTest] = useState(false);

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'blue';
  ctx.strokeStyle = 'black';

  const size = 5;
  let frameData = [9, 18, 27, 36, 45, 54];
  let active = [frameData[0]];
  let reachedSize = false;
  // let interval;
  let start;
  let activeAnimation;
  function animate() {
    tick();
    activeAnimation = requestAnimationFrame(animate);
  }
  function play() {
    if (!start) {
      start = Date.now();
    }
    if (!test) {
      animate();
    }
    // if (!test) {
    //   setTest(true);
    //   interval = setInterval(() => {
    //     tick();
    //   }, 200);
    // }
  }
  function tick () {
    console.log(start);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    active.forEach(x => ctx.fillRect(x, 0, size, canvas.height));
    active = active.map(x => x += 20).filter(x => x < canvas.width);
    if (active.length !== frameData.length && !reachedSize) {
      active.push(0);
    } else {
      reachedSize = true;
    }
    if (active.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log('stopping animation');
      cancelAnimationFrame(activeAnimation);
      // clearInterval(interval);
      // console.log('stopped interval');
      setTest(false);
      return;
    }
  }

  return (
    <div>
      Visualizing Street Fighter 3rd Strike Parries
      <InputBox />
      <button type="submit" onClick={play}>Testing Button</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));