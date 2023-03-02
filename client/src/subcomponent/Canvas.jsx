import React, { useState } from 'react';


function Canvas () {
  const [currentMove, setCurrentMove] = useState([]);
  const cvs = document.getElementsByTagName("canvas");
  const ctx = cvs.getContext("2d");
  ctx.fillStyle="white";
  ctx.strokeStyle="black";

  function drawLine(x1, y1) {
    ctx.fillRect(0, 0, 300, 300);
    ctx.moveTo(x1, y1);
    ctx.stroke();
  }

  return (
    <div className = "test">
      what does this do?
    </div>
  )
}

export default Canvas;