class Renderer {
    constructor () {

    }

    renderData (data) {
        data.forEach(city => city.temperature = parseInt(city.temperature) )
        let gridBody = $(`#grid-body`)
        gridBody.empty()
        const SOURCE = $(`#cities-weather-template`).html()
        const TEMPLATE = Handlebars.compile(SOURCE)
        let newHTML = TEMPLATE({citiesWeatherData : data})
        gridBody.append(newHTML)
    }
}