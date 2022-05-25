const fetch = require("node-fetch");
const weather = require("./forecast");

const geography = async (countryName) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${countryName}.json?types=country&access_token=pk.eyJ1IjoiYWhtYWRibHRhZ3kiLCJhIjoiY2t5bzNrOHVmMGltejJ3bjk0cXBscjZpMiJ9.6fzXQoxSJW0Cvr7BH7NcvA&limit=1`
  );
  if (response.status === 200) {
    const data = await response.json();
    const latitude = data.features[0].center[1];
    const longitude = data.features[0].center[0];
    return weather(latitude, longitude);
  } else throw new Error("Unabel to fetch data");
};

module.exports = geography;
