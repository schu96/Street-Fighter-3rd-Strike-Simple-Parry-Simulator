require('dotenv').config();
const express = require('express');
const path = require('path');
const {save, movelist} = require(path.join(__dirname, 'db.js'));

const app = express();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.post('/addMove', async (req, res) => {
  const test = await movelist.findOneAndUpdate({character: req.body.character, moveName: req.body.moveName, variant: req.body.variant}, req.body, {new: true, upsert: true});
  res.status(200).send('move was successfully saved');
});

app.get('/getFrames/:character/:moveName/:variant', async (req, res) => {
  const output = await movelist.findOne({character: req.params.character, moveName: req.params.moveName, variant: req.params.variant});
  res.status(200).send(output);
})

app.get('/getCharMoves/:character', async (req, res) => {
  const output = await movelist.find({character: req.params.character});
  console.log('this should be sent out', output);
  res.status(200).send(output);
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);