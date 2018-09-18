exports.get = (request, response) => {
  response.render('cohortWebsite', {
    cohortPage: 'active',
    layout: 'webSite',
    styleFile: 'cohortWebsite',
  });
};
