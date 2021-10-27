const time = document.querySelector(".time");
const date = document.querySelector(".date");

function showTime() {
  const onlyTime = new Date().toLocaleTimeString();
  time.textContent = onlyTime;
  showDate();
  setTimeout(showTime, 1000);
}

showTime();

function showDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const onlytDate = new Date().toLocaleDateString("en-US", options);
  date.textContent = onlytDate;
}
