class OWM
{
    static openweathermap_key = `${window.localStorage.getItem("owm_key")}`; // REPLACE THIS WITH YOUR API_KEY OR ADD TO owm_key LOCAL STORAGE!
    static openweathermap_interval = 60 * 15; // update interval in seconds (defaulting to 15 minutes)

    static weather_icon = document.getElementById("weather_icon");
    static weather_desc = document.getElementById("weather_desc");
    static weather_temp = document.getElementById("weather_temp");

    static GetByCity(city)
    {
        // fetch data and update localstorage + page.
        function f(city)
        {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM.openweathermap_key}&units=metric`)
                .then(response => response.text()) // use .text() instead of .json() so that we can save the raw json into localstorage
                .then(data => {
                    var js_c = JSON.parse(data);

                    (OWM.weather_icon ? OWM.weather_icon.src = `https://openweathermap.org/img/wn/${js_c['weather'][0]['icon']}@2x.png` : console.error("No element with id 'weather_icon' found."));
                    (OWM.weather_desc ? OWM.weather_desc.innerHTML = `${js_c['weather'][0]['main']}: ${js_c['weather'][0]['description']}` : console.error("No element with id 'weather_desc' found."));
                    (OWM.weather_temp ? OWM.weather_temp.innerHTML = `${Math.round(js_c['main']['temp'])}\u2103` : console.error("No element with id 'weather_temp' found."));

                    // save json data in text form for later (offline/cached) use.
                    window.localStorage.setItem('last_call', Date.now());
                    window.localStorage.setItem('last_resp', data);
            });
        }

        var last_call = window.localStorage.getItem('last_call');
        // if we do not have a call saved in local storage OR we do AND the set interval time has elapsed...
        if (!last_call || (last_call && ((Date.now() - last_call) >= (1000 * OWM.openweathermap_interval))))
        {
            // fetch and update weather information
            f(city);
        }
        else
        {
            var last_resp = window.localStorage.getItem('last_resp');
            if (last_resp)
            {
                var js_c = JSON.parse(last_resp);
                (OWM.weather_icon ? OWM.weather_icon.src = `https://openweathermap.org/img/wn/${js_c['weather'][0]['icon']}@2x.png` : console.error("No element with id 'weather_icon' found."));
                (OWM.weather_desc ? OWM.weather_desc.innerHTML = `${js_c['weather'][0]['main']}: ${js_c['weather'][0]['description']}` : console.error("No element with id 'weather_desc' found."));
                (OWM.weather_temp ? OWM.weather_temp.innerHTML = `${Math.round(js_c['main']['temp'])}\u2103` : console.error("No element with id 'weather_temp' found."));
            }
            else
            {
                console.error("an error occurred while loading weather data."); // we shouldn't really reach here, but if we do, throw an error.
            }
        }
    };
}
