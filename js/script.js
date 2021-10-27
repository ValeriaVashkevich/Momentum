const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay},`;
const input = document.querySelector(".name");
input.placeholder = "[Enter name]";

function showTime() {
  const onlyTime = new Date().toLocaleTimeString();
  time.textContent = onlyTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

function showDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const onlytDate = new Date().toLocaleDateString("en-US", options);
  date.textContent = onlytDate;
}

function getTimeOfDay() {
  const timeOfDayArray = ["Night", "Morning", "Day", "Evening"];
  const hours = new Date().getHours();
  if (hours % 6 === 0) {
    return timeOfDayArray[0];
  }
  if (hours % 6 === 1) {
    return timeOfDayArray[1];
  }
  if (hours % 6 === 2) {
    return timeOfDayArray[2];
  }
  if (hours % 6 === 3) {
    return timeOfDayArray[3];
  }
}

function showGreeting() {
  greeting.textContent = greetingText;
}
