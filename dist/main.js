const model = new Model()
const renderer = new Renderer()
const gridBody = $(`#grid-body`)

const loadPage = function () {
    model.getDataFromDB()
    .then(data => {
        model.cityData = data
        renderData()
        })
    .catch( erro => console.log(erro) )
}

const handleSearch = function () {
    let cityName = $(`#grid-header`).find(`input`).first().val()
    model.getCityData(cityName)
    .then( function (cityData) {
        model.cityData.push(cityData)
        renderData()
    })
    .catch( erro => console.log(erro) )
}

const saveCity = function () {
   const cityName = $(this).siblings().first().text()
   const city = model.cityData.find( city => city.name === cityName)
   model.saveCity(city)
   .then( data => {
        console.log($(this).closest(`div`).find(`.btn-city-save`).first().remove())
        console.log(data)
   })
   
}

const deleteCity = function () {
    const cityName = $(this).siblings().first().text()
    const id = $(this).closest(`.city`).data().id
    if(id) {
        model.removeCity(id)
        .then( city => {
            let index = model.cityData.findIndex(city => city._id === id)
            model.cityData.splice(index,1)
            renderData()
        })
        renderData()
    }
    else {
        let index = model.cityData.findIndex( city => city.name === cityName && city._id == undefined)
        model.cityData.splice(index,1)
        renderData()
    }
}

const refreshCity = function () {
    const cityName = $(this).closest(`div`).siblings().first().find(`span`).first().text()
    const weatherDataDiv = $(this).closest(`div`).siblings().first()
    model.updateCity(cityName)
    .then( city => {
        weatherDataDiv.children(`:nth-child(2)`).text(parseInt(city.temperature)+` C`)
        weatherDataDiv.children(`:nth-child(3)`).attr(`src`,`https://openweathermap.org/img/wn/${city.conditionPic}@2x.png`)
        weatherDataDiv.children(`:nth-child(4)`).text(city.condition)
    })
}


const renderData = function () {
    renderer.renderData(model.cityData)
}
loadPage()




$(`#grid-header`).on(`click` , `#btn-city-search` , handleSearch) 
gridBody.on(`click` , `.btn-city-save` , saveCity )
gridBody.on(`click` , `.btn-city-delete` , deleteCity)
gridBody.on(`click` , `.btn-refresh` ,refreshCity )