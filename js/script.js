let isItRu = localStorage.getItem("langRu");
console.log(isItRu);
if(isItRu === "true") {
  isItRu = true
} else {
  isItRu = false
}
console.log(isItRu);
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
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
const playListContainer = document.querySelector(".play-list");
const itemActive = document.getElementsByTagName("li");

// Translation:
document.onkeydown = (event) => {
  if (event.shiftKey & event.altKey) {
    if (!isItRu) {
      isItRu = true;
      city.value = "Mинск";
      input.placeholder = "[Введите имя]";
    } else {
      isItRu = false;
      city.value = "Minsk";
      input.placeholder = "[Enter name]";
    }
  }
  showGreeting();
  getWeather();
  showDate();
  saveLang();
};

const greetingTranslation = { en: "Good", ru: "Доброго" };

// Time:
function showTime() {
  const onlyTime = new Date().toLocaleTimeString();
  time.textContent = onlyTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

// Date:
function showDate() {
  let options;
  let onlytDate;
  if (!isItRu) {
    options = { weekday: "long", month: "long", day: "numeric" };
    onlytDate = new Date().toLocaleDateString("en-US", options);
  } else {
    options = { weekday: "long", day: "numeric", month: "long" };
    onlytDate = new Date().toLocaleDateString("ru-RU", options);
  }
  date.textContent = onlytDate;
}

function getTimeOfDay() {
  const timeOfDayArrayEn = ["Night", "Morning", "Afternoon", "Evening"];
  const timeOfDayArrayRu = ["Ночи", "Утра", "Дня", "Вечера"];
  const hours = new Date().getHours();
  const remainder = Math.trunc(hours / 6);
  if (remainder === 0) {
    if (!isItRu) {
      return timeOfDayArrayEn[0];
    } else {
      return timeOfDayArrayRu[0];
    }
  }
  if (remainder === 1) {
    if (!isItRu) {
      return timeOfDayArrayEn[1];
    } else {
      return timeOfDayArrayRu[1];
    }
  }
  if (remainder === 2) {
    if (!isItRu) {
      return timeOfDayArrayEn[2];
    } else {
      return timeOfDayArrayRu[2];
    }
  }
  if (remainder === 3) {
    if (!isItRu) {
      return timeOfDayArrayEn[3];
    } else {
      return timeOfDayArrayRu[3];
    }
  }
}

function getTimeOfDayForBackImg() {
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
  const timeOfDay = getTimeOfDay();
  if (!isItRu) {
    greeting.textContent = `${greetingTranslation.en} ${timeOfDay},`;
  } else {
    greeting.textContent = `${greetingTranslation.ru} ${timeOfDay},`;
  }
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

//  ////////////////////////////////////////

function saveLang() {
  localStorage.setItem("langRu", isItRu);
  // localStorage.removeItem('langRu'); // to back
}
window.addEventListener("load", saveLang);

function getLang() {
  if (localStorage.getItem("langRu")) {
    isItRu = localStorage.getItem("langRu");
    showGreeting();
    getWeather();
    showDate();
    if (isItRu) {
      city.value = "Mинск";
      input.placeholder = "[Введите имя]";
    } else {
      city.value = "Minsk";
      input.placeholder = "[Enter name]";
    }
  }
}

window.addEventListener("load", getLang);

// Body image:
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum(1, 20);

function setBg() {
  let timeOfDay = getTimeOfDayForBackImg();
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
  let url;
  if (!isItRu) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f072b5b73cc9205bc2745a4764d2c01e&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  }
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (!isItRu) {
    windSpeed.textContent = `Wind speed: ${Math.trunc(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } else {
    windSpeed.textContent = `Скорость ветра: ${Math.trunc(
      data.wind.speed
    )} m/s`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
  }
}
getWeather();

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
    duration: "00:39",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River_Flows_In_You.mp3",
    duration: "01:37",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio_Morricone.mp3",
    duration: "01:37",
  },
  {
    title: "Summer Wind",
    src: "./assets/sounds/Summer_Wind.mp3",
    duration: "01:50",
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

audio.addEventListener("ended", function () {
  isPlay = false;
  if (playNum < playList.length - 1) {
    playNum = playNum + 1;
    itemActive[playNum].classList.add("item-active");
    itemActive[playNum - 1].classList.remove("item-active");
  } else {
    playNum = 0;
    itemActive[playNum].classList.add("item-active");
    itemActive[playList.length - 1].classList.remove("item-active");
  }
  playAudio();
  isPlay = true;
});

playPlayer.onclick = () => {
  isNextButton = false;
  isPrevButton = false;
  itemActive[playNum].classList.add("item-active");
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
  if (playNum < playList.length - 1) {
    playNum = playNum + 1;
    itemActive[playNum].classList.add("item-active");
    itemActive[playNum - 1].classList.remove("item-active");
  } else {
    playNum = 0;
    itemActive[playNum].classList.add("item-active");
    itemActive[playList.length - 1].classList.remove("item-active");
  }

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
  if (playNum > 0) {
    playNum = playNum - 1;
    itemActive[playNum].classList.add("item-active");
    itemActive[playNum + 1].classList.remove("item-active");
  } else {
    playNum = playList.length - 1;
    itemActive[playNum].classList.add("item-active");
    itemActive[0].classList.remove("item-active");
  }
  if (!isPlay) {
    playAudio();
    isPlay = true;
  } else {
    playAudio();
  }
};

// Audio PlayList:
playList.forEach((el) => {
  const playItem = document.createElement("li");
  playItem.classList.add("play-item");
  playItem.textContent = `${el.title}`;
  playListContainer.append(playItem);
});
