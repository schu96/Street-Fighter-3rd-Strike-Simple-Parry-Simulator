const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parry',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => {
  console.log('MongoDB connection successful');
})
.catch((err) => {
  console.log('MongoDB connection failed', err);
});


let threeS = mongoose.Schema({
  character: {type: String, index: true},
  moveName: String,
  moveList: [],
  variant: String,
  url: String
});

let Movelist = mongoose.model('movelist', threeS, 'movelist');

let save = (character, moveName, moveList, url) => {
  const newMove = new Movelist();
  newMove.character = character;
  newMove.moveName = moveName;
  newMove.moveList = moveList;
  newMove.url = url;
  newMove.save(function(err) {
    if(err) {
      console.log('this is likely a dupe');
    }
  })
};

module.exports.save = save;
module.exports.movelist = Movelist;

