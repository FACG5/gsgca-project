exports.get = (request, response) => {
  response.render('clientWebsite', {
    layout: 'webSite',
    styleFile: 'projectWebsite',
  });
};
