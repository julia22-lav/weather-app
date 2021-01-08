import refs from "./refs.js";

class myWeather {
  constructor() {}

  getFetch(cityName) {
    let apiKey = "4969dc6edacb0c2c33df4734a435335f";
    // let cityName = "Sumy";
    const { weather, city, temp, flex, humidity, wind } = refs;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    flex.innerHTML = "";
    let result = fetch(url)
      .then((response) => {
        if (!response.ok) return alert("Enter a valid city");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        weather.classList.remove("loading");
        city.textContent = `Weather in ${data.name}`;
        let celcium = Math.round(data.main.temp - 273.15);
        temp.textContent = `${celcium}°C`;

        const iconData = data.weather.map((el) => {
          const img = document.createElement("img");

          img.src = `https://openweathermap.org/img/wn/${el.icon}.png`;
          img.alt = el.description;
          img.classList.add("icon");

          const div = document.createElement("div");
          div.classList.add("description");
          div.textContent = el.description;
          div.append(img);
          return div;
        });

        flex.prepend(...iconData);
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
      })
      .catch((error) => {
        console.error(`Ёпта, поломалось`, error);
        return result;
      });
  }
}

const { input, inputBtn } = refs;

inputBtn.addEventListener("click", () => {
  if (!query) return;
  let query = input.value;
  console.log(query);
  myWeather.getFetch(query);
  input.value = "";
});

input.addEventListener("keyup", (evt) => {
  let query = input.value;
  console.log(query);
  if (!query) return;
  if (evt.key === "Enter") {
    myWeather.getFetch(query);
    input.value = "";
  }
});
