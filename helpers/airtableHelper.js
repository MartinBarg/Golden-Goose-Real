var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patY0ZKOLTgDv4n03.343bbae3630c273b0177931d591e0297a657555af070e42694c4e02e0d9b50a7'}).base('appbYMW33uJOgeaIi');

var addGiver = (gName, gEmail, gAmount, gCode, gWish) => {
base('Givers').create([
  {
    "fields": {
      "fldnGBnvvbMIsrr4J": gName,
      "fldVtOlnynVxYgF5o": gEmail,
      "fldBLfLizlFJ7uXOg": gAmount,
      "fldscac2Fyvv3aV6f": gCode,
      "fldKR2KWkGFTK1uEB": gWish,
    }
  },
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function (record) {
    console.log(record.getId());
  });
})
}

module.exports = addGiver;