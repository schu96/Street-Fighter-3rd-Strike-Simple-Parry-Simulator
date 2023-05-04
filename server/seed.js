const Model = require('./db.js').movelist;
const exampleData = require('./movelistData.js');

Model.deleteMany({})
  .then(() => Promise.all(exampleData.map((item) => Model.create(item))))
  .then(() => console.log("Database has been reset"))
  .catch((err) => console.error("An error occurred while restarting the database: ", err))
  .then(() => process.exit());