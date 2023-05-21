const { fetchBreedDescription } = require('./breedFetcher'); // Importing fetchBreedDescription fucntion

const args = process.argv;
const commandLineArgs = args.slice(2); // Catching command line argumenets
const breedName = commandLineArgs[0];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});
