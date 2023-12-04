function handleErrors (err, req, res, next) {
  console(err)
  res.status(500).send('An internal error occurred')
}

module.exports = handleErrors
