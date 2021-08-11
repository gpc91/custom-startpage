# Startpage

## What is a start page?
Startpages are locally hosted webpages that load as a homepage or new tab page in a web browser.

## Setup
### Weather
Currently you will need to go into the developer tools > 'local storage' and add a new key "owm_key" which contains your openweathermap.org API key. Without it, it is not possible to display weather information.

## Credits
Demo Background Image ["Dark Green Fern Plant"](https://www.pexels.com/photo/dark-green-fern-plant-3145239/) by [Eriks Abzinovs](https://www.pexels.com/@pixworthmedia)

# Notes

## Firefox
This startpage utilizes the blur() function which requires the ```layout.css.backdrop-filter.enabled``` and ```gfx.webrender.all``` to be set to *true*. To do this, navigate to ```about:config``` and search the two settings and set them to be *true*.

More information can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter).
