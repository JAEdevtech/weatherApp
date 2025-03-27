const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const apiKey = process.env.API_KEY;

app.use(express.static(path.join(__dirname, "/src")));

app.listen(3000, () => {
  console.log("server started on PORT: 3000");
});
app.get("/weather/:latlon?", (req, res) => {
  const { latlon } = req.params;
  console.log(latlon);
  const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latlon}`;

  fetch(weatherUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("DATA NOT FECTHED!");
      }
    })
    .then((body) => {
      res.send(body);
      console.log(body);
    });
});

// function encodeQueryData(data) {
//   const ret = [];
//   for (let keyValueObj in data) {
//     ret.push(
//       encodeURIComponent(keyValueObj) +
//         "=" +
//         encodeURIComponent(data[keyValueObj])
//     );
//     console.log(encodeURIComponent(keyValueObj));
//     console.log(encodeURIComponent(data[keyValueObj]));
//   }
//   return ret.join("&");
// }

// const apiEndpoint = "http://api.weatherapi.com/v1/forecast.json?";
// // PARAMETERS (forecast): q , days , aqi , alerts
// const data = { key: apiKey, q: latlon };
// const querystring = encodeQueryData(data);
// const weatherUrl = apiEndpoint + querystring;
// console.log(weatherUrl);
