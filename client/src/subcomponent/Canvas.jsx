import React, { useState } from 'react';

function Canvas () {
  return (
    <>
    <h1>Visualizing Street Fighter 3rd Strike Parries</h1>
    <div className="pIntro">
      <h3>A Brief Introduction to Parries</h3>
        <p>
          The parry system was first introduced in Street Fighter III: 3rd Strike.
          A parry allows players to challenge their opponent's incoming attack,
          negate any incoming chip damage sustained by blocking,
          and potentially deliver a counterattack that is otherwise
          impossible to do while blocking.
          Parrying is also advantageous while in mid-air since there are little to no defensive options during a jump.
          Although there is a high reward for parrying, there is an inherent risk associated
          with the strict timing of a parry input.
          <br/> <br/>
          The most famous example of the 3rd Strike Parry shown here, where Daigo Umehara (Ken) manages to parry an incoming 15 hit super art move from
          Justin Wong (Chun Li) under tournament pressure.
          <iframe className="leggoJustin" width="560" height="315" src="https://www.youtube.com/embed/JzS96auqau0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </p>
    </div>
    <div className="pMechanics">
      <h3>How Parries Work</h3>
      <p>
        The command for a parry is straight forward.
        When you predict an incoming attack:
      </p>
        <ul className="parryList">
          <li>press ➡ while on the ground to negate High/Medium attacks</li>
          <li>press ⬇ to negate Low attacks</li>
          <li>press ➡ while in mid-air to negate most incoming attacks</li>
        </ul>
        <img src='https://media.tenor.com/z_0H2zfNTXUAAAAC/street-fighter-3rd-strike.gif' height='200' width='200'></img>
        <img src='https://media.tenor.com/feio_okrRYoAAAAd/street-fighter-dudley.gif' height='200' width='300'></img>
      <p>
        <br/>
        The real challenge of the parry stems from the timing.
        A parry is only active within 10 frames (0.16 seconds) of pressing forward and cannot be spammed due to the
        23 frame (0.36 seconds) cooldown period when an attack is not detected within the 10 frame parry window.
        <br/> <br/>
        Upon a successful parry, the attacker and parrier will be
        frozen in place for 16 frames (0.26 seconds) before allowing further player inputs.
        <br/>
        Parried projectiles and the parrier will be frozen in place but the attacker will not be frozen.
        <br/>
        A failed attempt will cause a player to take 100% damage from an attack
        compared to 16% - 25% damage while blocking.
        </p>
      <figure>
        <img className="yunP"src='https://media.tenor.com/hTxXbEMW33MAAAAd/street-fighter-3rd-strike.gif' height='200' width='300'/>
        <figcaption className="yunCaption">Ken is still able to move while Yun is stuck in the 16 frame freeze animation</figcaption>
      </figure>
    </div>
    <div className="pLearn">
      <h3>Learning How to Parry</h3>
        <p>
          The easiest way to learn how to parry is to simply practice. Single hit projectile attacks (i.e. Ryu's Hadoken, Ibuki's Kazekiri)
          and slower/predictable melee attacks (i.e. Q's Roundhouse, Alex's Flash Chop) are good introductions to parries.
          <br/>
          Multi-hit moves can have varying active hitbox frames that can complicate the parrying rhythm (i.e. Chun-Li's Hyakuretsu Kyaku) or additional hits based on the variant of the special attack used.
          <br/><br/>
        </p>
    </div>
    <div className="pLook">
      <h3>Test Your Timing</h3>
       <p>
        Use your keyboard to try it out! The InputBox can read your keyboard input ('d', 's', right arrow, left arrow) and visualize the timing between your inputs and a character move of your choice.
       </p>
    </div>
    </>
  )
}

export default Canvas;