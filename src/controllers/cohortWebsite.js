const getCohortsQuery = require('../database/queries/getCohorts');

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('homeWebsite', {
        layout: 'webSite',
        home: 'active',
        styleFile: 'homeWebsite',
        jsFile: 'homeWebsite',
      });
    }
    return response.render('cohortWebsite', {
      res,
      cohortPage: 'active',
      layout: 'webSite',
      styleFile: 'cohortWebsite',
    });
  });
};
