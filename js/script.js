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
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const playPlayer = document.querySelector(".play");
const playPrevPlayer = document.querySelector(".play-prev");
const playNextPlayer = document.querySelector(".play-next");
let isPlay = false;
let playNum = 0;
let isNextButton = false;
let isPrevButton = false;

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

// Quote:
function getRandomQuote(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomQuote = Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getQuotes() {
  const quotes = "https://www.breakingbadapi.com/api/quotes";
  const res = await fetch(quotes);
  const data = await res.json();
  getRandomQuote(0, 69);
  const authorOfQuote = randomQuote;
  quote.textContent = `"${data[randomQuote].quote}"`;
  author.textContent = data[authorOfQuote].author;
}
getQuotes();

changeQuote.onmouseup = getQuotes;

// Audio player:

const playList = [
  {
    title: "Aqua Caelestis",
    src: "./assets/sounds/Aqua_Caelestis.mp3",
    duration: "00:58",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River_Flows_In_You.mp3",
    duration: "03:50",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio_Morricone.mp3",
    duration: "03:50",
  },
  {
    title: "Summer Wind.mp3",
    src: "./assets/sounds/Summer_Wind.mp3",
    duration: "03:50",
  },
];

const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    playPlayer.classList.add("pause");
  }
  if (isPlay) {
    if (!isNextButton & !isPrevButton) {
      audio.pause();
      playPlayer.classList.remove("pause");
    }
    if (isNextButton || isPrevButton) {
      audio.play();
    }
  }
}

playPlayer.onclick = () => {
  isNextButton = false;
  isPrevButton = false;
  playAudio();
  if (!isPlay) {
    isPlay = true;
  } else {
    isPlay = false;
  }
};

playNextPlayer.onclick = () => {
  isNextButton = true;
  isPrevButton = false;
  playNum = playNum + 1;
  if (!isPlay) {
    playAudio();
    isPlay = true;
  } else {
    playAudio();
  }
};

playPrevPlayer.onclick = () => {
  isPrevButton = true;
  isNextButton = false;
  playNum = playNum - 1;
  if (!isPlay) {
    playAudio();
    isPlay = true;
  } else {
    playAudio();
  }
};
