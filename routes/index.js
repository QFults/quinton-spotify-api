module.exports = (app, spotify) => {
  app.get('/search', (req, res) => {
    spotify.search({ type: req.query.t, query: req.query.q }, (err, data) => {
      if (err) {
        res.json(err)
      }
      res.json(data)
    })
  })
}
