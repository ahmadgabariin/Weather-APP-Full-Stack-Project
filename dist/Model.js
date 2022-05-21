class Model {
    constructor () {
        this.cityData = []
    }

    getDataFromDB () {
        return $.get(`/cities`)
    }

    getCityData (cityName) {
        
        return $.get(`/city/${cityName}`)

    }

    saveCity (city) {

        return $.ajax({
            url : `/city`,
            type : `POST` ,
            data : city
        })
    }

    removeCity (id) {
        return $.ajax({
            url : `/city/${id}`,
            type : `DELETE`,
        })
    }

    updateCity (cityName) {
        return $.ajax({
            url : `/city/${cityName}`,
            type: `PUT`
        })

    }

}