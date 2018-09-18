exports.get = (request, response) => {
  response.render('clientWebsite', {
    layout: 'webSite',
    clientProjects: 'active',
    styleFile: 'projectWebsite',
  });
};
