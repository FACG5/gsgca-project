exports.get = (request, response) => {
  response.render('projectPageWebsite', {
    layout: 'webSite',
    styleFile: 'projectWebsite',
  });
};
