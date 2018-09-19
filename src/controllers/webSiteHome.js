exports.get = (request, response) => {
  response.render('homeWebsite', {
    layout: 'webSite',
    home: 'active',
    styleFile: 'homeWebsite',
    jsFile: 'homeWebsite',
    title: 'Gaza Sky Geeky | Code Academy',
  });
};
