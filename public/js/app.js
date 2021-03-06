const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getWeather = (countryName) =>
  fetch(`/weather?address=${countryName}`).then((response) => response.json());

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";

  getWeather(location).then((data) => {
    if (data.error) messageOne.textContent = data.error;
    else {
      messageOne.textContent = data.location;
      messageTwo.textContent = `It's currently ${data.forecast} degrees out`;
    }
  });
});
