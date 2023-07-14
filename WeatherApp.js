//Date, time and Day of the current day

const time = document.getElementById("time");
const currentDay = document.getElementById("Day");
const currentMonth = document.getElementById("month");
const currentDate = document.getElementById("date");
const temp = document.getElementById("Temp");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const max_temp = document.getElementById("mxtemp");
const min_temp = document.getElementById("mntemp");
const wind_speed = document.getElementById("windSpeed");
const locate = document.getElementById("Location");

const d = new Date();
const hour = d.getHours().toString().padStart(2, "0");
const hrIn12 = hour % 12 || 12;
const minute = d.getMinutes().toString().padStart(2, "0");
const amPm = hour >= 12 ? "PM" : "AM";
const currentTime = [hrIn12, minute].join(":") + " " + `<span>${amPm}</span>`;
time.innerHTML = currentTime;

const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
  new Date()
);
currentDay.innerHTML = day;

const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
  new Date()
);
currentMonth.innerHTML = month;

const date = d.getDate();
currentDate.innerHTML = date;

//Collecting the data and displaying

function weatherDetail(data) {
  const list = data?.main;
  const temperature = (list?.temp - 273.15).toFixed(2);
  temp.innerHTML = `${temperature}°C`;
  const humid = list?.humidity;
  humidity.innerHTML = `${humid} g/kg`;
  const psi = list?.pressure;
  pressure.innerHTML = `${psi} psi`;
  const maxTemp = (list?.temp_max - 273.15).toFixed(2);
  max_temp.innerHTML = `${maxTemp}°C`;
  const minTemp = (list?.temp_min - 273.15).toFixed(2);
  min_temp.innerHTML = `${minTemp}°C`;
  const windSpeed = data?.wind?.speed;
  wind_speed.innerHTML = `${windSpeed} m/s`;
  const location = data?.name;
  locate.innerHTML = location;
}

//Fetching the api for Scottsboro

const city = "Scottsboro";
const apiKey = "ffb7ef2f2d3e52a078716e7f2b9d59c2";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    weatherDetail(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });

function searchWeather() {
  const searchInput = document.getElementById("Search");
  const search = searchInput.value;
  if (search) {
    const apiKey = "ffb7ef2f2d3e52a078716e7f2b9d59c2";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        weatherDetail(data);
        searchInput.value = "";
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
}
