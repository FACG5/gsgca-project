const getCohortProjectQuery = require('../database/queries/getCohortProject');

exports.get = (request, response) => {
  const { id } = request.params;
  getCohortProjectQuery(id, (err, res) => {
    if (err) {
      return response.render('cohortPageWebsite', {
        err: 'There are No Project in this Fac !',
        layout: 'webSite',
        styleFile: 'cohortPageWebsite',
        jsFile: 'cohortPageWebsite',
      });
    }

    return response.render('cohortPageWebsite', {
      res,
      layout: 'webSite',
      styleFile: 'cohortPageWebsite',
      jsFile: 'cohortPageWebsite',
    });
  });
};
