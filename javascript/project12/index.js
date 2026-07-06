const btn = document.getElementById("weatherButton");
const input = document.getElementById("cityInput");

btn.addEventListener("click", async () => {
  const city = input.value;
  if (city === "") {
    return;
  }
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=e058aace91c840d6a1f70811260607&q=${city}&aqi=yes`,
  );
  const data = await response.json();

  let output = document.querySelector("p");
  output.textContent = `Temperatur of ${city} is ${data.current.temp_c} and weather forecast is ${data.current.condition.text}`;
});
