const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { appendFile } = require("fs");

const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
        res.sendFile(__dirname + "/index.html");
    }
); 

app.post("/", function(req, res){
        const query = req.body.cityName;
        const capitalizedQuery = req.body.cityName[0].toUpperCase() + req.body.cityName.slice(1);
        const apiKey =  "4a3fb6e10ce43d02287f4ca548e0077e";
        const unit = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
        https.get(url, function(response){
            console.log(response.statusCode);
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<h1>The temperature in " + capitalizedQuery + " is " + temp + " degrees Celsius.</h1>");
                res.write("<h1>The weather is currently: " + weatherDescription + "!</h1>");
                res.write("<img src=" + imgURL + ">");
                res.send();
                }
            );
        }
    );        
    }
);


app.listen(3000, function(){
        console.log("this server is running on port 3000");
    }
);