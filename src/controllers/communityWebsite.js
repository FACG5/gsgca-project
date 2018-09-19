exports.get = (request, response) => {
  response.render('communityWebsite', {
    layout: 'webSite',
    communityProjects: 'active',
    styleFile: 'projectWebsite',
    title: 'Code Academy | Community Projects',
  });
};
