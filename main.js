let cityInput = document.querySelector('.city');
let day = document.querySelector('.day');
let date_year = document.querySelector('.date');
let time = document.querySelector('.time');
let temperature = document.querySelector('.temperature');
let maxtemp = document.querySelector('.maxtemp');
let mintemp = document.querySelector('.mintemp');
let windSpeed = document.querySelector('.windspeed');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let sunriseTime = document.querySelector('.sunrisetime');
let sunsetTime = document.querySelector('.sunsettime');
let weatherStatus = document.querySelector('.weatherstatus');
let image = document.querySelector('.image');


cityInput.addEventListener("keyup", showWeather);


function showWeather(e) {

    // 13 je enter
    if(e.keyCode === 13){
        let city = cityInput.value;

        let xml = new XMLHttpRequest();
        
        xml.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b987fdcdd837b523b0408c3d5efee18&units=metric`);

        xml.onreadystatechange = function () {
            if(xml.readyState === 4 && xml.status === 200){
                displayResult(JSON.parse(xml.responseText));
            }
        };
        
        xml.send();   
    }
}

function displayResult(data) {

    console.log(data);

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000; //different time zones
    let utc = localTime + localOffset;

    let utcTime = utc + 1000*data.timezone; 
    let newCity = new Date(utcTime);

    let cityHour = newCity.getHours();
    let cityMinute = newCity.getMinutes();

    cityHour < 10 ? (cityHour = `0${cityHour}`) : (cityHour = cityHour);
    cityMinute < 10 ? (cityMinute = `0${cityMinute}`) : (cityMinute = cityMinute);

    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset * 1000).getHours();

    hsunrise < 10 ? (hsunrise = `0${hsunrise}`) : (hsunrise = hsunrise);
    hsunset < 10 ? (hsunset = `0${hsunset}`) : (hsunset = hsunset);
    msunrise < 10 ? (msunrise = `0${msunrise}`) : (msunrise = msunrise);
    msunset < 10 ? (msunset = `0${msunset}`) : (msunset = msunset);

    temperature.innerHTML = `${Math.round(data.main.temp)} &deg;C`;
    maxtemp.innerHTML = `Max: ${Math.round(data.main.temp_max)} &deg;C`;
    mintemp.innerHTML = `Min: ${Math.round(data.main.temp_min)} &deg;C`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`;
    humidity.innerHTML = `${data.main.humidity} %`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
    sunriseTime.innerHTML = `${hsunrise}:${msunrise} h`;
    sunsetTime.innerHTML = `${hsunset}:${msunset} h`;
    weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;
    
    let currentStatus = data.weather[0].description;
    
    if(currentStatus.includes("clear sky")){
        image.setAttribute("src", "images/01d.png");
    } else if (currentStatus.includes("few clouds")){
        image.setAttribute("src", "images/02d.png");
    } else if (currentStatus.includes("scattered clouds")) {
        image.setAttribute("src", "images/03d.png");
    } else if (currentStatus.includes("broken clouds")) {
        image.setAttribute("src", "images/04d.png");
    } else if (currentStatus.includes("shower rain")) {
        image.setAttribute("src", "images/09d.png");
    } else if (currentStatus.includes("rain")) {
        image.setAttribute("src", "images/10d.png");
    } else if (currentStatus.includes("thunderstorm")) {
        image.setAttribute("src", "images/11d.png");
    } else if (currentStatus.includes("snow")) {
        image.setAttribute("src", "images/13d.png");
    } else if (currentStatus.includes("mist")) {
        image.setAttribute("src", "images/50d.png");
    }

    let days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

    day.innerHTML = days[newCity.getDay()];
    date_year.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()}, ${newCity.getFullYear()}`;
    time.innerHTML = `${cityHour}:${cityMinute} h`;
}

