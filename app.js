function main() {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCordinate);
        } else {
            document.getElementById("temp-comment").textContent =
                "Geo Location problem please turn on location";
        }
    }

    function getCordinate(position) {
        const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        };
        displayWeather(coordinates);
    }
    getLocation();
}
async function getweather(lat, lon) {
    const key = "0f1f808bc93546f977683b063c081003";
    // const city = "Nampula";
    let url = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    // if (location.protocol === "http") {
    //     url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric `;
    // } else {
    //     url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric `;
    // }
    const data = await fetch(url);
    return data.json();
}

async function displayWeather(coordinates) {
    const weatherInfo = await getweather(coordinates.lat, coordinates.lon);
    const wCondition = weatherInfo.weather[0].main;
    changeBackground(wCondition);
    // console.log(bdy[0]);s
    const main = document.querySelector(".main");
    document.getElementById("city-name").textContent = weatherInfo.name;
    const img = document.querySelector(".weather-icon");
    img.innerHTML = `<img id="weather-icon" src="http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png" alt="">`;
    document.querySelector(".temp-nr").innerHTML = `${parseInt(
    weatherInfo.main.temp
  )} &#176C`;
    const weatherDescrt = weatherInfo.weather[0].description;
    document.getElementById("temp-comment").textContent =
        weatherDescrt.charAt(0).toUpperCase() + weatherDescrt.slice(1);
    document.getElementById(
        "humidity"
    ).textContent = `${weatherInfo.main.humidity}% Humidity`;
    document.getElementById("wind").textContent = `${(
    weatherInfo.wind.speed * 3.6
  ).toFixed(2)} km/h Wind`;
    document.getElementById("forecats").textContent = weatherInfo.weather[0].main;
    document.getElementById(
        "max-temp"
    ).innerHTML = `Max: ${weatherInfo.main.temp_max} &#176C`;
    document.getElementById(
        "min-temp"
    ).innerHTML = `Min: ${weatherInfo.main.temp_min} &#176C`;
    // document.getElementById("");

    main.classList.remove("remove");
}

function changeBackground(condition) {
    const bdy = document.getElementsByTagName("body");
    const time = new Date().getHours();
    const conditionPhotos = [
        "Clear",
        "Clouds",
        "Drizzle",
        "Mist",
        "Rain",
        "Snow",
        "Thunderstorm",
        "Tornado",
    ];
    if (conditionPhotos.indexOf(condition) > -1) {
        if (condition === "Clear" || condition === "Clouds") {
            if (time >= 18 || time < 6) {
                bdy[0].style.backgroundImage = `url(awe-backgrounds/${condition}-night.jpg)`;
            } else {
                bdy[0].style.backgroundImage = `url(awe-backgrounds/${condition}.jpg)`;
            }
        } else {
            bdy[0].style.backgroundImage = `url(awe-backgrounds/${condition}.jpg)`;
            // console.log(time);
            // console.log(condition);
        }
    } else {
        bdy[0].style.backgroundImage = `url(awe-backgrounds/General.jpg)`;
    }
}
main();