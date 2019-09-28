const Spotify = require('node-spotify-api')
const express = require('express')
const { parsed: keys } = require('dotenv').config()
const app = express()

const spotify = new Spotify({
  id: keys.SPOTIFY_ID,
  secret: keys.SPOTIFY_SECRET
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

require('./routes')(app, spotify)

app.listen(process.env.PORT || 3000)