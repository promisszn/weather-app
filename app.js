window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector(".degree-section span");
    let image = document.querySelector('.icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            const apikey = "f058378e9d8eedb15da5aa923bed30c7";
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

    // function setIcons(icon, iconID){
    //     const skycons = new Skycons({color: "white"});
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     skycons.play();
    //     return skycons.set(iconID, Skycons[currentIcon]);
    // }
});