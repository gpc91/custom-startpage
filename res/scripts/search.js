class SearchHandler
{

    static search_element = document.getElementById("bar");
    static select_element = document.getElementById("selector");

    static Search()
    {
        console.log("search...");
        // check the value of the selected index to ensure that even if the index of the elements change it won't end up breaking.
        switch (SearchHandler.select_element[SearchHandler.select_element.selectedIndex].value)
        {
            case "google":
                window.location.replace("https://google.com/search?q=" + SearchHandler.search_element.value);
                break;
            case "duck":
                window.location.replace("https://duckduckgo.com/?q=" + SearchHandler.search_element.value);
                break;
            case "bing":
                window.location.replace("https://bing.com/search?q=" + SearchHandler.search_element.value);
                break;
            case "yandex":
                window.location.replace("https://yandex.com/search/?text=" + SearchHandler.search_element.value);
                break;
            case "baidu":
                window.location.replace("http://www.baidu.com/s?wd=" + SearchHandler.search_element.value);
                break;
        }
    }

    static Change()
    {
        console.log("change...");
    }
}

document.getElementById("bar").addEventListener("search", SearchHandler.Search);
document.getElementById("bar").addEventListener("input", SearchHandler.Change);

var search_engine_choice = window.localStorage.getItem("search_engine_choice");
if (search_engine_choice)
{
    SearchHandler.select_element.value = search_engine_choice;
}

document.getElementById("selector").addEventListener("change", function()
{
    window.localStorage.setItem("search_engine_choice", selector.value);
});

// USE THE BELOW EVENTUALLY WHEN IT COMES TO SETTING UP INSTALL PAGE
/*
switch (window.location.pathname.split("/").pop().split(".")[0])
{
    case "index":
        // if first time load then display the welcome screen and ask user for name.
        if (localStorage.getItem("_cn") == undefined)
        {
        // set the name in local storage
            localStorage.setItem("_cn", "George");
        }
        else
        {
            document.getElementById("client_name").textContent = localStorage.getItem("_cn");
        }

        if (localStorage.getItem("_sc") == undefined)
        {
            localStorage.setItem("_sc", SearchHandler.GetSelector());
        }
        else
        {
            SearchHandler.SetSelector(localStorage.getItem("_sc"));
        }

        TimeStep();

        document.getElementById("search_bar").addEventListener("search", SearchHandler.Search);
        document.getElementById("search_bar").addEventListener("input", SearchHandler.Change);

        document.getElementById("search_selector").addEventListener("change", function()
        {
            localStorage.setItem("_sc", SearchHandler.selector_element.value);
        });
        break;
    case "welcome":
        //alert("Hello!");
        break;
}
*/