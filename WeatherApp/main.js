let apiKey = "82fc79616085623c9bdf3b631a0f0d4e"
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

let searchVal = document.querySelector(".search-box input");
let searchBtn = document.querySelector(".search-box button");
let weatherIcon = document.getElementById('icon');
let errorMsg = document.querySelector(".errorMsg");
let weather = document.querySelector(".weather-box");

async function getWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    if (data.cod === "404") {
        errorMsg.style.display = "block";
        weather.style.display = "none";
    } else {
        errorMsg.style.display = "none";
        weather.style.display = "block";
        const iconCode = data.weather[0].main.toLowerCase();
        const iconPath = `images/${iconCode}.png`;
        weatherIcon.src = iconPath;
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + "km/h";
    }
}
searchBtn.addEventListener("click", () => {
    weather.style.display = "block";
    getWeather(searchVal.value);
});

