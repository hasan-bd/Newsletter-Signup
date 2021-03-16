const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})


app.post('/',function(req,res){
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email = req.body.email
  console.log(firstName)
  console.log(lastName)
  console.log(email)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Mailchimp api key
// eab6dc7b875866da246ecfd834528f60-us1

// Audince // IDEA:
// c12404477c
