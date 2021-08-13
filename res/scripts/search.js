// TODO (George): eventually make modular?
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
