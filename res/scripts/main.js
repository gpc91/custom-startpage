switch (window.location.pathname.split("/").pop().split(".")[0])
{
    case "index":
        // index page
        console.log("We're in the index page.");
        if (!window.localStorage.getItem("owm-apikey"))
        {
            window.location.replace("setup.html?k=0");
        }
        else
        {
            index();
        }
        break;
    case "setup":
        // setup page
        console.log("We're in the setup page.");

        var api_box = document.getElementsByClassName('apikey')[0];

        var apikey_button = document.getElementsByClassName('apikey_button')[0];
        if (apikey_button)
        {
            apikey_button.addEventListener('click', function() {
                // when save button pressed save the information currently on the page into localstorage.

                console.log("saving...");

                // save own-apikey
                if (api_box.value.length > 0)
                {
                    window.localStorage.setItem('owm-apikey', api_box.value);
                }
            });
        }

        
        if (new URL(document.location).searchParams.get('k') == 0)
        {
            // if no key was found...
            console.log("No key was found...");            
            
        }
        else
        {
            // if we've made it here we should already know that the key exists.
            var apikey = window.localStorage.getItem('owm-apikey');
            api_box.value = apikey;
        }
        break;
}

function index()
{    
    func = function()
    {
        if (OpenWeather.StoredPosition())
        {
            // set position to use localStorage
            OpenWeather.Weather({
                position: "_",
                units: 'metric'
            });
        }
        else
        {
            // otherwise get position from navigator
            navigator.geolocation.getCurrentPosition(function(pos) {
                OpenWeather.Weather({
                    position: pos,
                    units: 'metric'
                });
            });    
        }
    }      

    func();
    setInterval(func, 1000 * 5);
            
    // CLOCK UPDATE
    dt = new Date();
    document.getElementById('clock').innerText = dt.toLocaleString().substring(12, 20);
    setInterval(function() 
    {
        dt.setTime(Date.now());
        document.getElementById('clock').innerText = dt.toLocaleString().substring(12, 20);
    }, 1000);    
}

window.onload = function()
{
    // if a background.jpg file exists set it as background.
    document.getElementsByTagName('body')[0].style['background-image'] = `url("res/images/background/pexels-eriks-abzinovs-3145239.jpg")`;

    
    document.getElementById("bar").addEventListener("search", function()
    {
        SearchHandler.Search();
    });
    document.getElementById("bar").addEventListener("input", function()
    {
        SearchHandler.Change();
    });

    var search_engine_choice = window.localStorage.getItem("search_engine_choice");
    if (search_engine_choice)
    {
        SearchHandler.select_element.value = search_engine_choice;
    }

    document.getElementById("selector").addEventListener("change", function()
    {
        window.localStorage.setItem("search_engine_choice", selector.value);
    });


}
