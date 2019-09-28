module.exports = (app, spotify) => {
  app.get('/search', (req, res) => {
    spotify.search({ type: req.query.t ? req.query.t : 'track', query: req.query.q ? req.query.q : 'Dancing Queen' }, (err, data) => {
      if (err) {
        res.json(err)
      }
      res.json(data)
    })
  })
}
