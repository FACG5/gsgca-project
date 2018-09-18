exports.get = (request, response) => {
  response.render('cohortPageWebsite', {
    layout: 'webSite',
    styleFile: 'cohortPageWebsite',
    jsFile: 'cohortPageWebsite',
  });
};
