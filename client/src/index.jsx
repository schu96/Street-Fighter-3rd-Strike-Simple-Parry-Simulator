import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
// ReactDOM.render no longer supported in React18

import InputBox from './subcomponent/InputBox.jsx';
import Canvas from './subcomponent/Canvas.jsx';

function App() {
  const [playing, setPlaying] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [character, setCharacter] = useState('Q');
  const [moveName, setMoveName] = useState('');
  const [movesList, setMovesList] = useState({});
  const [frameData, setFrameData] = useState([]);
  const [addStartDelay, setAddStartDelay] = useState('init');
  const [gif, setGif] = useState('');
  const [gifList, setGifList] = useState({});
  const CHARS = ['Akuma', 'Alex', 'Chun-Li', 'Dudley', 'Elena', 'Hugo', 'Ibuki', 'Ken', 'Makoto', 'Necro', 'Oro', 'Q', 'Remy', 'Ryu', 'Sean', 'Twelve', 'Urien', 'Yang', 'Yun'];

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'red';
  let active = [0];

  useEffect(() => {
    reset()
    setAddStartDelay('init')
    setMoveName('');
    if (movesList[character] === undefined) {
      axios.get(`/getCharMoves/${character}`)
      .then((data) => {
        if (data.data.length !== 0) {
          let moves = {...movesList};
          let gifs = {...gifList};
          data.data.forEach((obj) => {
            if (moves[obj.character] === undefined) {
              moves[obj.character] = {};
            }
            moves[obj.character][obj.moveName] = obj.moveList;
            if (gifs[obj.character] === undefined) {
              gifs[obj.character] = {};
            }
            gifs[obj.moveName] = obj.url;
          })
          const def = data.data[0];
          setFrameData(def.moveList);
          setGif(def.url);
          setMovesList(moves);
          setGifList(gifs);
        }
      })
      .catch((err) => {console.log('there was an error with setup', err)})
    }
  }, [character])

  useEffect(() => {
    setAddStartDelay('init')
    if (movesList[character]) {
      setFrameData(movesList[character][moveName])
    }
    if (gifList) {
      setGif(gifList[moveName]);
    }
    show()
  }, [moveName])

  useEffect(() => {
    if (addStartDelay !== 'init' && frameData.length !== 0) {
      let temp = [...frameData];
      temp = temp.map((frame) => {
        if (frame === 0) {
          return 0;
        }
        return addStartDelay ? frame += 100 : frame -= 100;
      })
      setFrameData(temp);
    }
  }, [addStartDelay])

  let [size, reachedSize] = [1, false];
  let activeAnimation;

  function play() {
    activeAnimation = requestAnimationFrame(play);
    tick();
  }
  function tick () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    active.forEach(x => {
      // ctx.beginPath(); ctx.rect(x, 0, size, canvas.height); ctx.fill(); ctx.stroke();
      ctx.fillRect(x, 0, size, canvas.height);
    });
    active = active.map(x => x += 10).filter(x => x < canvas.width);
    if (active.length <= frameData.length - 1 && !reachedSize) {
      setTimeout(() => { active.push(0); },
      frameData[active.length] - frameData[active.length - 1 < 0 ? 0 : active.length - 1]);
    }
    else {
      reachedSize = true;
    }
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
  function reset() {
    stop()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
  function delay() {
    if (addStartDelay === 'init') {
      setAddStartDelay(true);
    } else {
      setAddStartDelay(!addStartDelay);
    }
  }
  function show() {
    if (frameData.length === 0) { return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameData.forEach(x => {
      ctx.fillStyle = 'red';
      ctx.fillRect(x, 0, size, canvas.height);
      if (x !== 0) {
        ctx.fillStyle = 'pink';
        ctx.lineCap = 'round';
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = 'pink';
        ctx.fillRect(x - 10, 0, 10, canvas.height);
      }
    });
  }
  function charDropdown() {
    return CHARS.map((character) => {
      return ( <option value={character} key={character}>{character}</option> )
    })
  }
  function moveDropdown() {
    if (movesList[character]) {
      return Object.keys(movesList[character]).map((move) => {
        return (
          <option value={move} key={character + move}>{move}</option>
        )
      })
    }
  }
  function handleChar(e) { setCharacter(e.target.value); }
  function handleMove(e) { setMoveName(e.target.value);}
  return (
    <>
      <Canvas />
      <InputBox setUserInput={setUserInput} frameData={frameData}/>
      <div className="moveContainer">
        <img className="gifMove" src={gif}/>
      </div>
      <br/>
      <select name="charDropdown" onChange={handleChar}>
        <option value="">--Select a character--</option>
        {charDropdown()}
      </select>
      <select name="moveName" onChange={handleMove}>
        <option>--Select a move--</option>
        {moveDropdown()}
      </select>
      <br/>
      <button type="submit" onClick={play}>Animate Frames</button>
      <button type="submit" onClick={stop}>Pause</button>
      <button type="submit" onClick={reset}>Clear</button>
      <button type="submit" onClick={show}>Show Frames</button>
      <button type="submit" onClick={delay}>
        {addStartDelay !== 'init' && addStartDelay ? 'Remove 100 frame delay' : 'Add 100 frame delay'}
      </button>
      <br/>
    </>
  );
}

// const container = document.getElementById('app');
// const root = createRoot(container);
// root.render(<App />);
createRoot(document.getElementById('app')).render(<App />);

// React17 render
// ReactDOM.render(<App />, document.getElementById('app'));
