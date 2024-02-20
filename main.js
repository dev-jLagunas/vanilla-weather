import "/style.css";

//Dom Elements
const displayContainer = document.querySelector(".display-container");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const weatherDisplay = document.querySelector(".weather-display");
const weatherDetails = document.querySelector(".details-display");
const errorDisplay = document.querySelector(".error-display");

//Event Listeners
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = searchInput.value;
  if (city === "") {
    alert("Please Enter Valid City");
    return;
  }

  const weatherData = await fetchWeather(city);
  displayWeather(weatherData);
});

//Fetch data
async function fetchWeather(city) {
  const apiKey = "66115d93752379ae34741f97bca71e20";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

//Display data
function displayWeather(data) {
  const image = document.querySelector(".weather-img");
  const temp = document.querySelector(".temp");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity span");
  const wind = document.querySelector(".wind span");

  if (data.cod === "404") {
    displayContainer.style.height = "600px";
    weatherDisplay.style.display = "none";
    weatherDetails.style.display = "none";
    errorDisplay.style.display = "block";
    errorDisplay.classList.add("fadeIn");
    return;
  }

  errorDisplay.style.display = "none";
  errorDisplay.classList.remove("fadeIn");

  switch (data.weather[0].main) {
    case "Clear":
      image.src = "images/clear.png";
      break;
    case "Rain":
      image.src = "images/rain.png";
      break;
    case "Snow":
      image.src = "images/snow.png";
      break;
    case "Clouds":
      image.src = "images/cloud.png";
      break;
    case "Haze":
      image.src = "images/mist.png";
      break;
    default:
      image.src = "";
  }

  temp.innerHTML = `${parseInt(data.main.temp)}<span class="degrees">°C</span>`;
  description.textContent = `${data.weather[0].description}`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${parseInt(data.wind.speed)}Km/h`;

  weatherDisplay.style.display = "";
  weatherDetails.style.display = "";
  displayContainer.style.height = "600px";
  weatherDisplay.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
}
