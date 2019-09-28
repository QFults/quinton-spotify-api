module.exports = (app, spotify) => {
  app.get('/search', (req, res) => {
    spotify.search({ type: req.query.t ? req.query.t : 'track', query: req.query.q ? req.query.q : 'Dancing Queen' }, (err, { tracks: { items } }) => {
      if (err) {
        res.json(err)
      }  
      spotify.request(`https://api.spotify.com/v1/audio-features?ids=${items.map(({ id }) => id).join(',')}`, (err, { audio_features }) => {
        if (err) {
          res.json(err)
        }
        res.json(items.map((song, i) => ({ ...song, ...audio_features[i]})))
      })
    })
  })

}
