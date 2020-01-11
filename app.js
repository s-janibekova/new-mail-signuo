

// IMPORT LIBRARIES
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')


// USE APPS
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}));


// handle home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

// handle post to sign up
app.post("/", (req, res) => {
  var email = req.body.email
  var fName = req.body.fName
  var lName = req.body.lName

// data for api mailchip
  var data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fName,
        LNAME: lName
      }
    }]
  }

  var jsonData = JSON.stringify(data)

//  requets to api
  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/89a0488389',
    method: "POST",
    headers: {
      "Authorization": "sj 623e88f4cd9a3c805c834b295122bcde-us4"
    },
    body: jsonData
  }

  request(options, (error, response, body) => {
    console.log(response.statusCode)
    if (error) {
      res.sendFile(__dirname + "/failure.html")
    } else if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
  })
})


app.post("/failure", (req, res) => {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running")
})

//api key   623e88f4cd9a3c805c834b295122bcde-us4
//unique id Collegues  89a0488389
