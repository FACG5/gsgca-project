exports.get = (request, response) => {
  response.render('homeWebsite', {
    layout: 'webSite',
    styleFile: 'homeWebsite',
    jsFile: 'homeWebsite',
  });
};
