import { weather } from "../api-data.js";
import { inputValue } from "../searchInput.js";
import { seshdata } from "../getGeoData.js";
const data = await weather(seshdata);
// const data = await weather(inputValue)
// Add layer to map
const map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
// Destructured API data
const { country, name, localtime, region, lat, lon } = data.location;
const {
  moon_illumination,
  moon_phase,
  moonrise,
  moonset,
  sunrise,
  sunset,
  //   uv
} = data.forecast.forecastday[0].astro;
const {
  daily_will_it_rain,
  daily_chance_of_rain,
  totalprecip_mm,
  totalprecip_in,
  daily_chance_of_snow,
  daily_will_it_snow,
  totalsnow_cm,
  avghumidity,
  avgtemp_c,
  avgtemp_f,
  maxtemp_c,
  maxtemp_f,
  mintemp_c,
  mintemp_f,
  maxwind_kph,
  maxwind_mph,
} = data.forecast.forecastday[0].day;
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
// Temperature
export class Temperature {
  constructor(temp_c) {
    this.temp_c = temp_c;
    // this.heatindex_c = heatindex_c;
    return this;
  }
  hourlyTemp(tempRAte, time) {
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }
    this.temp_c = tempRAte;

    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            fill: "origin",
            label: "Temperature",
            data: tempRAte,
            borderColor: "blue",
            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: 1,
          },
        },
      },
    });
    return this;
  }
}
// WIND
export class Wind {
  constructor(
    gust_kph,
    gust_mph,
    wind_degree,
    wind_dir,
    wind_kph,
    wind_mph,
    windchill_c,
    windchill_f
  ) {
    // speed
    this.gust_kph = gust_kph;
    this.gust_mph = gust_mph;
    // angle
    this.wind_degree = wind_degree;
    // direction
    this.wind_dir = wind_dir;
    // speed
    this.wind_kph = wind_kph;
    this.wind_mph = wind_mph;
    // temperature
    this.windchill_c = windchill_c;
    this.windchill_f = windchill_f;
  }
  hourlyWindChart() {
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }
    this.wind_kph = wind_kph;
    this.gust_kph = gust_kph;

    const ctx = document.getElementById("myChart");
    const time = data.forecast.forecastday[0].hour;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: time.map((hour) => hour.time.substring(10)),
        datasets: [
          {
            fill: "origin",
            label: ` Wind kph`,
            data: time.map((hour) => hour.wind_kph),
            borderColor: "blue",
            borderWidth: 4,
          },
          {
            fill: "origin",
            label: ` Gust kph `,
            data: time.map((hour) => hour.gust_kph),
            borderColor: "green",
            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  hourlyWindChill() {
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }
    this.windchill_c = windchill_c;

    const ctx = document.getElementById("myChart");
    const time = data.forecast.forecastday[0].hour;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: time.map((hour) => hour.time.substring(10)),
        datasets: [
          {
            fill: "origin",
            label: "Windchill C",
            data: time.map((hour) => hour.windchill_c),
            borderColor: "blue",
            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  }
  hourlyWindDegree() {
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }
    this.wind_dir = wind_dir;
    this.wind_degree = wind_degree;
    const ctx = document.getElementById("myChart");
    const time = data.forecast.forecastday[0].hour;
    new Chart(ctx, {
      type: "radar",
      data: {
        labels: time.map((hour) => hour.time.substring(10)),
        datasets: [
          {
            label: "Wind Degree C",
            data: time.map((hour) => hour.wind_degree),
            fill: "true",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    });
    return this;
  }
}
// new Wind().hourlyWindChart();
// console.log(new Wind().hourlyWindChart().hourlyWindChill().hourlyWindDegree());

// RAIN
export class Rain {
  constructor(
    // rain fall
    precip_in,
    precip_mm,
    // probability
    daily_will_it_rain,
    daily_chance_of_rain,
    // total rain fall
    totalprecip_mm,
    totalprecip_in
  ) {
    this.precip_in = precip_in;
    this.precip_mm = precip_mm;
    this.daily_will_it_rain = daily_will_it_rain;
    this.daily_chance_of_rain = daily_chance_of_rain;
    this.totalprecip_mm = totalprecip_mm;
    this.totalprecip_in = totalprecip_in;
    return this;
  }
  hourlyRain() {
    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }
    this.precip_mm = precip_mm;

    const ctx = document.getElementById("myChart");
    const time = data.forecast.forecastday[0].hour;
    new Chart(ctx, {
      type: "line",
      data: {
        labels: time.map((hour) => hour.time.substring(10)),
        datasets: [
          {
            fill: "origin",
            label: "Rain Fall mm",
            data: time.map((hour) => hour.precip_mm),
            borderColor: "blue",
            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  }
}
new Rain().hourlyRain();
console.log(new Rain().hourlyRain());

// DEW POINT
export class Dew_Point {
  constructor(dewpoint_c, dewpoint_f, humidity) {
    this.dewpoint_c = dewpoint_c;
    this.dewpoint_f = dewpoint_f;
    this.humidity = humidity;
  }
  calculateFog() {}
}
// ASTRO
export class Astro {
  constructor(
    moon_illumination,
    moon_phase,
    moonrise,
    moonset,
    sunrise,
    sunset
  ) {
    this.moon_illumination = moon_illumination;
    this.moon_phase = moon_phase;
    this.moonrise = moonrise;
    this.moonset = moonset;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }
  animate() {}
}
// SNOW
export class Snow {
  constructor(daily_chance_of_snow, daily_will_it_snow, totalsnow_cm) {
    this.daily_chance_of_snow = daily_chance_of_snow;
    this.daily_will_it_snow = daily_will_it_snow;
    this.totalsnow_cm = totalsnow_cm;
  }
}
// DAY
export class Day {
  constructor(
    avghumidity,
    avgtemp_c,
    avgtemp_f,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    maxwind_kph,
    maxwind_mph,
    totalprecip_in,
    totalprecip_mm,
    totalsnow_cm
  ) {
    this.avghumidity = avghumidity;
    this.avgtemp_c = avgtemp_c;
    this.avgtemp_f = avgtemp_f;
    this.maxtemp_c = maxtemp_c;
    this.maxtemp_f = maxtemp_f;
    this.mintemp_c = mintemp_c;
    this.mintemp_f = mintemp_f;
    this.maxwind_kph = maxwind_kph;
    this.maxwind_mph = maxwind_mph;
    this.totalprecip_in = totalprecip_in;
    this.totalprecip_mm = totalprecip_mm;
    this.totalsnow_cm = totalsnow_cm;
  }
}
// UV
export class UV {
  constructor(uv) {
    this.uv = uv;
  }
}
// Location
export class Location {
  constructor(country, name, region, lat, lon) {
    this.country = country;
    this.name = name;
    this.region = region;
    this.lat = lat;
    this.lon = lon;
  }
  geoMap(lat, lon, bindPopup) {
    map.setView([lat, lon], 13);
    L.marker()
      .setLatLng([lat, lon])
      .addTo(map)
      .bindPopup(bindPopup)
      .openPopup();
  }
}
