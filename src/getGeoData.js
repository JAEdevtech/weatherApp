import { Location } from "./components/data-components.js";
import { weather } from "./api-data.js";

export const seshdata = sessionStorage.getItem("BrowserLocation");
const data = await weather(seshdata);
const { country, name, localtime, region, lat, lon } = data.location;
const { temp_c, condition } = data.current;
const bindPopup = `${name}<br>${country} <br> ${localtime}<br>Temperature :${temp_c} &degC <br> ${condition.text}`;

navigator.geolocation.getCurrentPosition(showPosition);
console.log(sessionStorage);

function showPosition(pos) {
  const myLocation = `${pos.coords.latitude},${pos.coords.longitude}`;
  const shesh = sessionStorage.setItem("BrowserLocation", myLocation);
  if (sessionStorage === "BrowserLocation") {
    console.log("location in session storage");
  } else {
    new Location().geoMap(pos.coords.latitude, pos.coords.longitude, bindPopup);
  }
}
