const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;
const input = document.querySelector(".name");
input.placeholder = "[Enter name]";
const body = document.body;
let randomNum;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const windSpeed = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
city.value = "Minsk";

// Time:
function showTime() {
  const onlyTime = new Date().toLocaleTimeString();
  time.textContent = onlyTime;
  showDate();
  showGreeting();
  getWeather();
  setTimeout(showTime, 1000);
}

showTime();

// Date:
function showDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const onlytDate = new Date().toLocaleDateString("en-US", options);
  date.textContent = onlytDate;
}

function getTimeOfDay() {
  const timeOfDayArray = ["Night", "Morning", "Afternoon", "Evening"];
  const hours = new Date().getHours();
  const remainder = Math.trunc(hours / 6);
  if (remainder === 0) {
    return timeOfDayArray[0];
  }
  if (remainder === 1) {
    return timeOfDayArray[1];
  }
  if (remainder === 2) {
    return timeOfDayArray[2];
  }
  if (remainder === 3) {
    return timeOfDayArray[3];
  }
}

// Greeting:
function showGreeting() {
  greeting.textContent = greetingText;
}

// Local storage:
function setLocalStorage() {
  localStorage.setItem("name", input.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    input.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// Body image:
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1, 20);

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNum = null;
  const randomNumLength = 2;
  if (randomNum < 10) {
    bgNum = randomNum.toString().padStart(randomNumLength, "0");
  } else bgNum = randomNum;

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay.toLocaleLowerCase()}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

setBg();

// Body slider:
function getSlideNext() {
  const max = 20;
  let nextNum = randomNum;
  if (nextNum < max) {
    randomNum += 1;
  }
  if (nextNum === max) {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() {
  const min = 1;
  let prevNum = randomNum;
  if (prevNum > min) {
    randomNum -= 1;
  }
  if (prevNum === min) {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//Weather:
async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f072b5b73cc9205bc2745a4764d2c01e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `Wind speed: ${Math.trunc(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

//Weather for definite city:
city.addEventListener("change", getWeather);
