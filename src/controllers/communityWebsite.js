exports.get = (request, response) => {
  response.render('communityWebsite', {
    layout: 'webSite',
    styleFile: 'projectWebsite',
  });
};
