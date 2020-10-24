// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  blockquote = document.querySelector('.quote');
  quote = document.querySelector('.quote q');
  author = document.querySelector('.quote footer cite');
  bgBtn = document.querySelector('.change-bg-btn');

// ПОФИКСИТЬ ЕБАНЫЙ НОЛЬ
// ЭФФЕКТ РАЗМЫТОСТИ ИЛИ КОНТРАСТНОСТИ 
// ИНПУТЫ ДОДЕЛАТЬ

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  setTimeout(showTime, 1000);
}

function showDate(){
  let today = new Date();
  let secToEnd = 86400 - (today.getSeconds() + (60 * (today.getMinutes() + (60 * today.getHours()))));

  date.innerHTML = `${getWeekDay(today)}, ${getStrMonth(today)} ${today.getDay()}`;
  setTimeout(showDate, secToEnd)
}

function getWeekDay(date){
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return days[date.getDay()];
}

function getStrMonth(date){
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return months[date.getMonth()]
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
let timestamp = Math.floor(Date.now() / 1000)

function setBgGreet() {
  if((timestamp + 1) <= Math.floor(Date.now() / 1000)){
    let today = new Date(),
    hour = today.getHours(),
    randomImgUrl = `${addZero(randomInteger(1, 19))}.jpg`
    document.body.style.backgroundImage = 'url("../assets/images/overlay.png")';
    if (hour < 12 && hour >= 6) {
      // Morning
      document.body.style.backgroundImage +=
        `,url('assets/images/morning/${randomImgUrl}')`;
      greeting.textContent = 'Good Morning, ';

    } else if (hour >= 12 && hour < 18) {
      // Afternoon
      document.body.style.backgroundImage +=
        `,url('assets/images/day/${randomImgUrl}')`;
      greeting.textContent = 'Good Afternoon, ';

    } else if (hour >= 18 && hour < 24){
      // Evening
      document.body.style.backgroundImage +=
        `,url('assets/images/evening/${randomImgUrl}')`;
      greeting.textContent = 'Good Evening, ';

    } else if (hour >= 24 || hour < 6){
      // Night
      document.body.style.backgroundImage +=
      `,url('assets/images/night/${randomImgUrl}')`;
      greeting.textContent = 'Good Night, ';
    }
    document.body.style.backgroundPosition = 'center';
    timestamp = Math.floor(Date.now() / 1000);
  }
}

// Get Name
function getName() {
  if (!localStorage.getItem('name')) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if ((e.which == 13 || e.keyCode == 13)) {
      localStorage.setItem('name', e.target.innerText);

      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get Quote

async function getQuote(){
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  quotes = await res.json();
  blockquote.addEventListener('click', showQuote);
  showQuote(quotes);
}

// Show Quote 
function showQuote(){
  const randomQuote = quotes[randomInteger(0, quotes.length - 1)];
  quote.innerHTML = ` ${randomQuote['text']} `;
  author.innerHTML = randomQuote['author'] ? `- ${randomQuote['author']}` : '- Unknown';
}

function randomInteger(min, max) {
  // Random number from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Get wether
const weatherIcon = document.querySelector('.weather-icon');
const city = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&apikey=7a1102cde77d59543b4f3913072bc6e9&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
bgBtn.addEventListener('click', setBgGreet);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
getQuote();
getWeather()
showDate();
setBgGreet();
setInterval(setBgGreet, 60000);
getName();
getFocus();