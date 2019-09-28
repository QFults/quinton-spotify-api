module.exports = (app, spotify) => {
  app.get('/search', (req, res) => {
    spotify.search({ type: req.query.t && 'trackartistalbum'.includes(req.query.t) ? req.query.t : 'track', query: req.query.q ? req.query.q : 'Dancing Queen' }, (err, data) => {
      if (err) {
        res.json(err)
      }
      if (data.tracks) {
        const items = data.tracks.items
        spotify.request(`https://api.spotify.com/v1/audio-features?ids=${items.map(({ id }) => id).join(',')}`, (err, { audio_features }) => {
          if (err) {
            res.json(err)
          }          
          res.json(items.map((song, i) => ({ ...song, ...audio_features[i] })))
        })
      } else if (data.artists) {
        res.json(data.artists.items)
      } else {
        res.json(data.albums.items)
      }
    })
  })

}
