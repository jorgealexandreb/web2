const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res) {
        res.sendFile(__dirname + "/calculator.html");
    }
);

app.post("/", function(req, res) {
        var num1 = Number(req.body.num1);
        var num2 = Number(req.body.num2);
        var finResult = num1 + num2;

        res.send("Your result is: " + finResult);
    }
);


app.get("/bmicalculator", function(req, res) {
        res.sendFile(__dirname + "/bmicalculator.html");
    }
);

app.post("/bmicalculator", function(req, res) {
        var weight = parseFloat(req.body.weight);
        var height = parseFloat(req.body.height);
        var bmi = weight / (height * height);

        res.send("Your BMI is: " + bmi);
    }
);

app.listen(3000, function() {
        console.log("server running on port 3000")
    }
);