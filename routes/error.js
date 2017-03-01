const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json(err)
})

module.exports = router
