require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', express.Router());
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);