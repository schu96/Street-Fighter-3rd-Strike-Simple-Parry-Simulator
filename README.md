# Street Fighter 3rd Strike: Simple Parry Simulator

<div align="center">
  <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' />
  <img src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' />
  <img src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge' />
  <img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' />
</div>

## Description
A fullstack project built within a 48 hour deadline that explains the parry mechanic from Street Fighter III: 3rd Strike and runs a simplified simulator that allows users to test their timing for parry inputs against moves from the SF3S cast.

The Character Frame data and User Inputs on the page are built using HTML Canvas elements and dynamically renders each move's frame data upon input. User inputs may vary between systems based on the refresh rate of the user's monitor.

## Dependencies
MongoDB version 5.0.14

Mongosh version 1.1.7

Dependency packages can be installed with the command

```
npm install
```

The MongoDB collections are seeded by running seed.js based on the character movelist in the movelistData.js file.
