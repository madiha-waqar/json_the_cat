const request = require("request"); // Importing request library

const fetchBreedDescription = function(breedName, callback) {
  if (breedName === undefined || breedName === "") {
    // Edge Case: Breed Not Found or not provided
    callback("Provide breed. Breed not found! Try again.",null);
    return;
  }
  request(
    `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`,
    (error, response, body) => {
      if (error !== null) {
        //  Edge Case: Request Failed i-e url not correct
        callback(`Error ${error.code} occured during accessing host ${error.hostname}.`,null);
        return;
      }
      let data = JSON.parse(body); // Deserialization: Converting body which is the entire response body sent back from the API server into object
      //console.log(data);
      //console.log(typeof data);
      if (data.length === 0) {
        callback(`No data is available for asked breed ${breedName}.`, null);
        return;
      }
      console.log(`# of records found for ${breedName}: ${data.length}`);
      data.forEach((element) => {
        console.log(`************  ${element.name}   ************`);
        callback(null,element.description);
      });
    }
  );
};

module.exports = { fetchBreedDescription };
