class OpenWeather
{
    static openweathermap_key = `${window.localStorage.getItem("owm_key")}`; // REPLACE THIS WITH YOUR API_KEY OR ADD TO OpenWeather_key LOCAL STORAGE!
    static openweathermap_interval = 60 * 5; // update interval in seconds (defaulting to 5 minutes)

    static weather_icon = document.getElementById("weather_icon");
    static weather_desc_main = document.getElementById("weather_desc_main");
    static weather_desc_sub = document.getElementById("weather_desc_sub");
    static weather_temp = document.getElementById("weather_temp");
    static weather_location_name = document.getElementById("weather_location_name");

    static latitude = window.localStorage.getItem("owm_latitude");
    static longitude = window.localStorage.getItem("owm_longitude");

    static Weather(params)
    {

        function f(params)
        {
            var url = OpenWeather.UrlBuilder(params);
            if (url)
            {
                fetch (url)
                    .then(response => response.text())
                    .then(data => {
                        OpenWeather.UpdatePage(data);
                    }); 
            }
            else
            {
                console.error("Malformed URL.");
            }   
        }

        // if there is a stored call and the specified interval time has elapsed since its call then we can call it again to get
        // data to populate the page with
        var last_call = window.localStorage.getItem('last_call');
        if (!last_call || (last_call && ((Date.now() - last_call) >= (1000 * OpenWeather.openweathermap_interval))))
        {
            f(params);
        }
        else
        {
            // if there is a response stored from a previous call then use that data to populate the page.
            var last_resp = window.localStorage.getItem('last_resp');
            if (last_resp)
            {
                OpenWeather.UpdatePage(last_resp, true);
            }
            else
            {
                console.error("An unknown error occurred while loading weather data.");
            }
        }  
    }

    static UpdatePage(data, local = false)
    {
        var js_c = JSON.parse(data);
        (OpenWeather.weather_icon ? OpenWeather.weather_icon.src = `https://openweathermap.org/img/wn/${js_c['weather'][0]['icon']}@2x.png` : console.error("No element with id 'weather_icon' found."));
        (OpenWeather.weather_desc_main ? OpenWeather.weather_desc_main.innerHTML = `${js_c['weather'][0]['main']}` : console.error("No element with id 'weather_desc_main' found."));
        (OpenWeather.weather_desc_sub ? OpenWeather.weather_desc_sub.innerHTML = `${js_c['weather'][0]['description']}` : console.error("No element with id 'weather_desc_sub' found."));
        (OpenWeather.weather_temp ? OpenWeather.weather_temp.innerHTML = `${Math.round(js_c['main']['temp'])}\u2103` : console.error("No element with id 'weather_temp' found."));
        (OpenWeather.weather_location_name ? OpenWeather.weather_location_name.innerHTML = `${js_c['name']}` : console.error("No element with id 'weather_location_name' found."));
        if (!local)
        {
            // save json data in text form for later (offline/cached) use.
            window.localStorage.setItem('last_call', Date.now());
            window.localStorage.setItem('last_resp', data);
        }
    }

    static UrlBuilder(params)
    {
        /*
            city: 
            zip:
            country:
            position: 
            units: 
        */
        let url = "https://api.openweathermap.org/data/2.5/weather?";
        
        let parameters = [];

        if (params)
        {
            (params['city'] ? parameters.push(`q=${params['city']}`) : console.error("no city."));
            if (params['zip'])
            {
                if (params['country'])
                {
                    parameters.push(`zip=${params['zip']},${params['country']}`);
                }
                else
                {
                    parameters.push(`zip=${params['zip']}`);
                }
            }
            // "_" placeholder for "use stored position"
            if (params['position'] == "_")
            {
                // if we have already stored lon, lat information, use that
                if (OpenWeather.longitude && OpenWeather.latitude)
                {
                    console.log(`local stored (lon: ${OpenWeather.longitude}, lat: ${OpenWeather.latitude})`);
                    window.localStorage.getItem('owm_longitude');
                    window.localStorage.getItem('owm_latitude');
                    parameters.push(`lon=${OpenWeather.longitude}&lat=${OpenWeather.latitude}`);
                }
                else
                {
                    console.error("No local longitude or latitude stored...");
                    return null;
                }
            }
            else
            {
                (params['position'] ? parameters.push(`lon=${params['position'].coords.longitude}&lat=${params['position'].coords.latitude}`) : console.error("no GeolocationPosition specified"));                   
                if (!window.localStorage.getItem("owm_longitude")) window.localStorage.setItem("owm_longitude", params['position'].coords.longitude);
                if (!window.localStorage.getItem("owm_latitude")) window.localStorage.setItem("owm_latitude", params['position'].coords.latitude);
            }
            (params['units'] ? parameters.push(`units=${params['units']}`) : console.error("no units specified"));
        }

        parameters.forEach(function(value)
        {

            console.log(value);

            url += `${value}&`;
        });
        url += `appid=${OpenWeather.openweathermap_key}`;
        console.log(url);
        return url;
    }
    
    // check for stored coords.
    static StoredPosition()
    {
        if (OpenWeather.longitude && OpenWeather.latitude)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

}
