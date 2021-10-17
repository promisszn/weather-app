window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector(".degree-section span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long  = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;

            // const response = await fetch(api);
            // const data = await response.json();
            // console.log(data);

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const{temperature, summary, icon} = data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                
                // Formula for celsius
                let celsius = (temperature - 32) * (5/9);

                // Set Icon
                setIcons(icon, document.querySelector(".icon"));

                // Change temperature to Celsius/Fahrenheit
                degreeSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent  === "°F"){
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
            })
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});