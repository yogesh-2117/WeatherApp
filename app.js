// const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post('/Weather.html',(req,res)=>{
    console.log("post received!!!")
    
    const query = req.body.cityName;
    const apiKey = "bd7fd29a691c58d7ba219e87a68feee5";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`
    https.get(url,(response)=>{
        response.on("data",(d)=>{
            console.log(response.statusCode)
            const WeatherData = JSON.parse(d)
            const Description = WeatherData.weather[0].description
            const temp = WeatherData.main.temp
            const icon = WeatherData.weather[0].icon
            const feelsLike = WeatherData.main.feels_like
            const humidity = WeatherData.main.humidity
            
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<h1>Weather at ${query}:${Description}</h1>`)
            res.write(`<img src = ${imageURL}>`)
            res.write(`<h2>Temparature is ${temp} degrees celcius</h2>
                        <p>Feels Like ${feelsLike} degrees celcius</p>
                        <p>Humidity is around ${humidity}</p>`)
            res.send()
        })
    })
})
     

app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000.")
})