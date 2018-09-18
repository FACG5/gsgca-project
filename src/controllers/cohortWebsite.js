exports.get = (request, response) => {
  response.render('cohortWebsite', {
    layout: 'webSite',
    styleFile: 'cohortWebsite',
  });
};
