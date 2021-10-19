window.addEventListener('load', () => {
    let long;
    let lat;
    const apikey = "f058378e9d8eedb15da5aa923bed30c7";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector(".degree-section span");
    let image = document.querySelector('.icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long  = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`;

            // const response = await fetch(api);
            // const data = await response.json();
            // console.log(data);
            // console.log(data.data[0].temp);

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const temp = data.main.temp;
                const summary = data.weather[0].description;
                const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.name;
                image.style.backgroundImage = "url('" + icon + "')";
                image.style.backgroundRepeat = "no-repeat";
                image.style.backgroundSize = "100%"
                
                // Formula for celsius
                let Fahrenheit = (temp * 1.8) + 32;

                // Set Icon
                // setIcons(icon, document.querySelector(".icon"));

                // Change temperature to Celsius/Fahrenheit
                degreeSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent  === "°C"){
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(Fahrenheit);
                    } else {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                })
            })
        });
    }

    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search')

    const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    async function getWeatherByLocation(city) {
        const resp = await fetch(url(city), { origin: "cors" });
        const respData = await resp.json();
    
        console.log(respData);
    
        addWeatherToPage(respData);
    }

    function addWeatherToPage(data) {
        const temp = Math.floor(data.main.temp);
    
        const weather = document.createElement("div");
        weather.classList.add("weather");
    
        weather.innerHTML = `
            <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
            <small>${data.weather[0].main}</small>
        `;
    
        // cleanup
        main.innerHTML = "";
    
        main.appendChild(weather);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const city = search.value;
    
        if (city) {
            getWeatherByLocation(city);
        }
    });
});