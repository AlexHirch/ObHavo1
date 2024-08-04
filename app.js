const SearchInput = document.querySelector(".searchInput");
const searchLocation = document.getElementById("searchLocation");
const loader = document.querySelector(".loader");
const weater = document.querySelector(".weater");
const weaterIcon = document.querySelector(".temp i");
const errori = document.querySelector(".error");

let location1 = "";


const apiKey = "10ba1b17f3712fbe5abbea4a26a6c746";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

searchLocation.onsubmit = (e) => {
  e.preventDefault();
  weaterCheck(SearchInput.value);
};

async function weaterCheck(city) {
  weater.classList.add("active");
  loader.classList.remove("active");
  const responce = await fetch(apiURL + city + `&appid=${apiKey}`);
  if(responce.status == 404){
    errori.classList.add("errvis");
  }
  const data = await responce.json();
  console.log("DATA: ", data);
  document.querySelector(".location span").innerHTML =
    data.sys.country + " " + data.name;
  document.querySelector(".temp span").innerHTML = Math.round(data.main.temp);
  document.querySelector(".s1 span").innerHTML = data.main.humidity;
  document.querySelector(".s2 span").innerHTML = Math.round(data.wind.speed);

  if (data.weather[0].description == "clear sky") {
    weaterIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].description == "few clouds") {
    weaterIcon.className = "fa-solid fa-cloud-sun";
  } else if (data.weather[0].description == "scattered clouds") {
    weaterIcon.className = "fa-solid fa-cloud";
  } else if (data.weather[0].description == "broken clouds") {
    weaterIcon.className = "fa-solid fa-cloud";
  } else if (data.weather[0].description == "shower rain") {
    weaterIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].description == "rain") {
    weaterIcon.className = "fa-solid fa-cloud-showers-heavy";
  } else if (data.weather[0].description == "thunderstorm") {
    weaterIcon.className = "fa-solid fa-cloud-bolt";
  } else if (data.weather[0].description == "snow") {
    weaterIcon.className = "fa-solid fa-snowflake";
  } else if (data.weather[0].description == "thunderstorm") {
    weaterIcon.className = "fa-solid fa-smog";
  }
  errori.classList.remove("errvis");
  loader.classList.add("active");
  weater.classList.remove("active");
}
