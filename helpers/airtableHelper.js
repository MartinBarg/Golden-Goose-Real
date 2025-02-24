var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patY0ZKOLTgDv4n03.343bbae3630c273b0177931d591e0297a657555af070e42694c4e02e0d9b50a7'}).base('appbYMW33uJOgeaIi');

var addGiver = async (gName, gMail, gAmount, gCode, gWish) => {
  return new Promise ((resolve, reject) => {
base('Givers').create([
  {
    "fields": {
      "fldnGBnvvbMIsrr4J": gName,
      "fldVtOlnynVxYgF5o": gMail,
      "fldBLfLizlFJ7uXOg": gAmount,
      "fldscac2Fyvv3aV6f": gCode,
      "fldKR2KWkGFTK1uEB": gWish
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

var getGivers = base('Givers').select({
  sort: [{field: "fldd72R7puhqluDks", direction: "asc"}]
}).eachPage(function page (records, fetchNextPage){
  records.forEach(function(record) {
    giversArray.push({
      giverName : record.get('fldnGBnvvbMIsrr4J'),
      giverWish: record.get('fldKR2KWkGFTK1uEB'),
      giverAmount: record.get('fldBLfLizlFJ7uXOg'),
      giverCode: record.get('fldscac2Fyvv3aV6f'),
      giverMail: record.get('fldVtOlnynVxYgF5o')
  })
    //    console.log('Retrieved', record.get('Name'));
});
fetchNextPage();
}, 
function done(err) {
  if (err) { console.error(err); return; }
});


module.exports = {addGiver, getGivers}