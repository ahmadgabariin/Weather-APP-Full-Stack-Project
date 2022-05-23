const { response } = require('express');
const express = require(`express`)
const router = express.Router()
const axios = require('axios').default;
const weatherAPIKey = `f3ca6afc62b919b733cee3f25650a381`
const language = `he`
const City = require(`../models/City`)


router.get( `/city/:cityName` , function (request , response) {
    const cityName = request.params.cityName
    getCityData(cityName)
    .then(res => {
        const cityOBJ = getAttribute(res)
        response.send(cityOBJ)
        response.end()
    })
    .catch( error => {
        console.log(error)
        response.send(`Something Wrong !`)
        response.end()
    } )  
})

router.get(`/cities` , function (request , response) {
    City.find({} ,function (error , cities) {
        response.send(cities)
    })
})

router.post(`/city` , function (request , response) {

    const cityOBJ = request.body
    new City(cityOBJ).save()
    .then( city => {
        response.status(201).send(`${city.name} has been saved successfully !`)
        response.end()
    })

} )

router.delete(`/city/:id` , function(request , response) {
    const id = request.params.id
    City.findByIdAndRemove(id)
    .exec( function (error , city) {
        city ? response.status(202).send(`${city.naem} has been removed`) : response.status(404).send(`Not found!`)
        response.end()
    } )
    
} )

router.put(`/city/:cityName` , function (request , response) {
    let cityName = request.params.cityName
    cityName = cityName[0].toUpperCase() + cityName.slice(1)
  
    getCityData(cityName)
    .then( function (city) {
        let updatedCity = getAttribute(city)
    updateCity(cityName)
    .then(function (city) {
        if(city) {
            for(key of Object.keys(updatedCity)) {
                city[key] = updatedCity[key]
            }  
            city.save()
            response.status(202).send(city)
            response.end()
        }else {
            response.status(202).send(updatedCity)
            response.end()
        }
    })
   
    })
} )


function updateCity (cityName) {
    return City.findOne({ "name" : cityName})
}

function getAttribute(city) {
   return {
        name : city.data.name,
        temperature : city.data.main.temp ,
        condition : city.data.weather[0].description,
        conditionPic : city.data.weather[0].icon
    }
}

function getCityData (cityName) {
   return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIKey}&units=Metric`)
}



module.exports = router