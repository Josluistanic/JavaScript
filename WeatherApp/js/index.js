const apiKey = "Your API KEY";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

function Ktoc(K) { //Kelvin To ºC
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city)
    }
});

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cross"
    });

    const respData = await resp.json();
    addWeatherToPage(respData);
    console.log(respData);
}



function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `  
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>  
    <small>${data.weather[0].main}</small>  
    `;
    //cleanup
    main.innerHTML = "";
    main.appendChild(weather);
};