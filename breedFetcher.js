const request = require("request"); // Importing request library
const args = process.argv;
const commandLineArgs = args.slice(2); // Catching command line argumenets
const breedName = commandLineArgs[0];

if (breedName === undefined || breedName === "") {
  // Edge Case: Breed Not Found or not provided
  console.log("Provide breed. Breed not found! Try again.");
  return;
}

const fetchBreedDescription = function(breedName) {
  request(
    `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`,
    (error, response, body) => {
      //  Edge Case: Request Failed i-e url not correct
      if (error !== null) {
        console.log(
          `Error ${error.code} occured during accessing host ${error.hostname}.`
        );
        return;
      }
      let data = JSON.parse(body); // Deserialization: Converting body which is the entire response body sent back from the API server into object
      //console.log(data);
      //console.log(typeof data);
      if (data.length === 0) {
        console.log(`No data is available for asked breed ${breedName}.`);
        return;
      }
      console.log(`# of records found for ${breedName}: ${data.length}`);
      data.forEach((element) => {
        console.log(`************  ${element.name}   ************`);
        console.log(element.description);
      });
    }
  );
};

fetchBreedDescription(breedName);