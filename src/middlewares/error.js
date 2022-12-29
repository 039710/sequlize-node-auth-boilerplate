// Error Middleware


module.exports = (err, req, res, next) => {
  console.log(err)
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({ message: errors });
  }

  return res.status(500).json({ message: err.message });
}