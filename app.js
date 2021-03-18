const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})


app.post('/', function(req, res) {
  const lastName = req.body.lName
  const firstName = req.body.fName
  const email = req.body.email
  console.log(firstName)
  console.log(lastName)
  console.log(email)

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const url = 'https://us1.api.mailchimp.com/3.0/lists/c12404477c'

  const option = {
    method: "post",
    auth: "Kamrul:8f6bd4fd15a0f25adfcf64c9e1c6d321-us1"
  }

  var jsonData = JSON.stringify(data)
  const request = https.request(url, option, function(response) {
    if (response.statusCode===200){
      res.sendFile(__dirname + '/success.html')
    }
    else{
    res.sendFile(__dirname + '/failure.html')
    }

    response.on('data', function(data) {
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData)
  request.end()


})


app.post('/failure',function(req,res){
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Mailchimp api key
// eab6dc7b875866da246ecfd834528f60-us1

// Audince // IDEA:
// c12404477c
