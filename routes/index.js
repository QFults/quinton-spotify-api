module.exports = (app, spotify) => {
  app.get('/search', (req, res) => {
    spotify.search({ type: req.query.t ? req.query.t : 'track', query: req.query.q ? req.query.q : 'Dancing Queen' }, (err, { tracks: { items } }) => {
      if (err) {
        res.json(err)
      }
      res.json(items)
    })
  })
}
