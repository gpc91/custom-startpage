class OWM
{
    static openweathermap_key = `${window.localStorage.getItem("owm_key")}`; // REPLACE THIS WITH YOUR API_KEY OR ADD TO owm_key LOCAL STORAGE!
    static openweathermap_interval = 60 * 15; // update interval in seconds (defaulting to 15 minutes)

    static weather_icon = document.getElementById("weather_icon");
    static weather_desc = document.getElementById("weather_desc");
    static weather_temp = document.getElementById("weather_temp");

    static Weather(params)
    {

        function f(params)
        {
            console.log(OWM.UrlBuilder(params));
            fetch (OWM.UrlBuilder(params))
                .then(response => response.text())
                .then(data => {
                    OWM.UpdatePage(data);
                }); 
        }

        // if there is a stored call and the specified interval time has elapsed since its call then we can call it again to get
        // data to populate the page with
        var last_call = window.localStorage.getItem('last_call');
        if (!last_call || (last_call && ((Date.now() - last_call) >= (1000 * OWM.openweathermap_interval))))
        {
            f(params);
        }
        else
        {
            // if there is a response stored from a previous call then use that data to populate the page.
            var last_resp = window.localStorage.getItem('last_resp');
            if (last_resp)
            {
                OWM.UpdatePage(last_resp, true);
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
        (OWM.weather_icon ? OWM.weather_icon.src = `https://openweathermap.org/img/wn/${js_c['weather'][0]['icon']}@2x.png` : console.error("No element with id 'weather_icon' found."));
        (OWM.weather_desc ? OWM.weather_desc.innerHTML = `${js_c['weather'][0]['main']}: ${js_c['weather'][0]['description']}` : console.error("No element with id 'weather_desc' found."));
        (OWM.weather_temp ? OWM.weather_temp.innerHTML = `${Math.round(js_c['main']['temp'])}\u2103` : console.error("No element with id 'weather_temp' found."));
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
        let url = String();
        url = url.concat(url, "https://api.openweathermap.org/data/2.5/weather?");
        
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
            (params['position'] ? parameters.push(`lon=${params['position'].coords.longitude}&lat=${params['position'].coords.latitude}`) : console.error("no GeolocationPosition specified"));
            (params['units'] ? parameters.push(`units=${params['units']}`) : console.error("no units specified"));
        }

        parameters.forEach(function(value)
        {
            url += `${value}&`;
        });
        url += `appid=${OWM.openweathermap_key}`;

        return url;
    }
}
