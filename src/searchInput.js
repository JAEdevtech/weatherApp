import { Location, Wind } from "./components/data-components.js";
import { Temperature } from "./components/data-components.js";
import { weather } from "./api-data.js";

const submitCity = document.getElementById("submitBtn");
const city = document.getElementById("cityInput");
const button = document.getElementById("button1");

export let inputValue = "";
city.addEventListener("input", (e) => {
  inputValue = e.target.value;
});

submitCity.addEventListener("click", async () => {
  const city_name = encodeURIComponent(inputValue);
  const data = await weather(city_name);
  console.log(data);
  const { country, name, localtime, region, lat, lon } = data.location;
  const {
    temp_c,
    condition,
    gust_kph,
    gust_mph,
    wind_degree,
    wind_dir,
    wind_kph,
    wind_mph,
    windchill_c,
    windchill_f,
    precip_in,
    precip_mm,
    dewpoint_c,
    dewpoint_f,
    humidity,
    uv,
  } = data.current;

  const forecastDay = data.forecast.forecastday[0].day;
  // Daily Data
  ////////////////////////////////
  /*daily_will_it_rain
    daily_chance_of_rain
    totalprecip_mm
    totalprecip_in
    daily_chance_of_snow
    daily_will_it_snow
    totalsnow_cm
    avghumidity
    avgtemp_c
    avgtemp_f
    maxtemp_c
    maxtemp_f
    mintemp_c
    mintemp_f
    maxwind_kph
    maxwind_mph*/
  /////////////////////////////////

  const forecastAstro = data.forecast.forecastday[0].astro;
  // Astro Data
  /////////////////////////////////
  //     moon_illumination
  //     moon_phase
  //     moonrise
  //     moonset
  //     sunrise
  //     sunset
  //////////////////////////////////

  // Get hourly Temperature
  const forecastHour = data.forecast.forecastday[0].hour;
  const temp = forecastHour.map((hour) => {
    const tempRate = hour.temp_c;
    return tempRate;
  });

  // Get Hourly TimeStamp
  const hourLabel = forecastHour.map((hours) => hours.time.substring(10));

  const bindPopup = `${name}<br>${country} <br> ${localtime}<br>Temperature :${temp_c} &degC <br> ${condition.text}`;

  new Location().geoMap(lat, lon, bindPopup);
  new Temperature().hourlyTemp(temp, hourLabel);
});
