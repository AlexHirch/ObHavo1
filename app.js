const SearchInput = document.querySelector(".searchInput");
const searchLocation = document.getElementById("searchLocation");
const loader = document.querySelector(".loader");
const weater = document.querySelector(".weater");
const weaterIcon = document.querySelector(".temp i");
const errori = document.querySelector(".error");
const toTop = document.querySelector(".toTop");
const MapLocation = document.getElementById("MapLocation");

let lat = "";
let lon = "";

const apiKey = "10ba1b17f3712fbe5abbea4a26a6c746";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&`;

searchLocation.onsubmit = (e) => {
  e.preventDefault();
  weaterCheck(SearchInput.value);
  SearchInput.value = "";
  scroolTo0();
};

window.onscroll = () => {
  if(window.scrollY > 20){
    toTop.classList.remove("active");
  }else{
    toTop.classList.add("active");
  }
};

const scroolTo0 = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

async function weaterCheck(city) {
  weater.classList.add("active");
  loader.classList.remove("active");
  const responce = await fetch(apiURL + "q=" + city + `&appid=${apiKey}`);
  if (responce.status == 404) {
    errori.classList.add("errvis");
  }
  const data = await responce.json();
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

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  toTop.classList.add("active");
};

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  weaterCheck2();
}

async function weaterCheck2(city) {
  weater.classList.add("active");
  loader.classList.remove("active");
  const responce = await fetch(
    apiURL + `lat=${lat}&lon=${lon}` + `&appid=${apiKey}`
  );
  if (responce.status == 404) {
    errori.classList.add("errvis");
  }
  const data = await responce.json();
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
