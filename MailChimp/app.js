const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const listId = "b87d22b276";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
        res.sendFile(__dirname + "/signup.html");
    }
);

mailchimp.setConfig({
    apiKey: "21ff85513344fc5d5fc9d6c3709f1fe6-us1",
    server: "us1",
  });



app.post("/", function(req, res) {
    async function addUser() {
        const subscribingUser ={
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: req.body.eMail,
            status: "subscribed",
            merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
            }
        }
        
    );}

    
        if (res.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } 
        else {res.send("The requested failed to be submited.")}

        addUser();
        console.log("success!");
    }
);


app.listen(process.env.PORT || 3000, function(){
        console.log("Server is up and running!");
    }
);
