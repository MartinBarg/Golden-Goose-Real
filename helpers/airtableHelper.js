var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patY0ZKOLTgDv4n03.343bbae3630c273b0177931d591e0297a657555af070e42694c4e02e0d9b50a7'}).base('appbYMW33uJOgeaIi');

var addGiver = async (gName) => {
  return new Promise ((resolve, reject) => {
base('Givers').create([
  {
    "fields": {
      "fldnGBnvvbMIsrr4J": gName,
    }
  },
], function(err, records) {
  if (err) {
    console.error("Airtable error:", err);
    reject(err);
  } else{
    resolve(records[0]);
  }
});
});
}

module.exports = addGiver;