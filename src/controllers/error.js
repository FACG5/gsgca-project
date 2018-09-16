exports.client = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    errorMessage: 'Page not found',
    style: ['error'],
  });
};

exports.server = (err, req, res, next) => {
  console.log(err);
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    errorMessage: 'Internal server error',
    style: ['error'],
  });
};
