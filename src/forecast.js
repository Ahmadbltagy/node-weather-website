const fetch = require("node-fetch");

const weather = async (lat, long) => {
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=a32f5b4f35701f00a3b47ca4739c1323&query=${lat},${long}`
  );
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else throw new Error("Unabel to fetch data");
};

module.exports = weather;
