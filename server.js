const express = require(`express`)
const path = require(`path`)
const app = express()
const port = 3000
const api = require(`./server/routes/api`)
var bodyParser = require('body-parser')
const mongoose = require(`mongoose`)



mongoose.connect( `mongodb://localhost/WeatherDB` , { useNewUrlParser: true } )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended : false } ) )
app.use( express.static( path.join(__dirname , `dist`) ) )
app.use( express.static( path.join( __dirname , `node_modules` ) ) )
app.use( `/` , api )


app.listen( port , function () {

    console.log(`Server running on port ${port}`)

} )
