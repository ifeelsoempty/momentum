// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  quote = document.querySelector('.quote');

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
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(),
    randomImgUrl = `${addZero(randomInteger(1, 19))}.jpg`

  if (hour < 12 && hour >= 6) {
    // Morning
    document.body.style.backgroundImage =
      `url('assets/images/morning/${randomImgUrl}'), center`;
    greeting.textContent = 'Good Morning, ';

  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      `url('assets/images/day/${randomImgUrl}'), center`;
    greeting.textContent = 'Good Afternoon, ';

  } else if (hour >= 18 && hour < 24){
    // Evening
    document.body.style.backgroundImage =
      `url('assets/images/evening/${randomImgUrl}')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';

  } else if (hour < 6){
    // Night
    `url('assets/images/night/${randomImgUrl}'), center`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
  document.body.style.backgroundPosition = 'center';
  
  setTimeout(setBgGreet, 60000)
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
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
const quotes = '';

async function getQuote(){
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const quotes = await res.json();
  showQuote(quotes);
}

// Show Quote 

function showQuote(quotes){
  quote.innerHTML = quotes[randomInteger(0, quotes.length - 1)]['text'];
  setTimeout(showQuote, 60000, quotes)
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
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

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
getName();
getFocus();