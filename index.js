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

require('./routes')(app, spotify)

app.listen(process.env.PORT || 3000)