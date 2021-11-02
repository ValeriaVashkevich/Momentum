const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;
const input = document.querySelector(".name");
input.placeholder = "[Enter name]";
const body = document.body;

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
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
  let timeOfDay =  getTimeOfDay();
  let randomNum = getRandomNum(1, 20);
  let bgNum = null;
  const randomNumLength = 2;
  if (randomNum < 10) {
    bgNum = randomNum.toString().padStart(randomNumLength, "0");
  } else bgNum = randomNum;
  let bgUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay.toLocaleLowerCase()}/${bgNum}.jpg`
  body.style.backgroundImage = `url('${bgUrl}')`;
}

setBg()