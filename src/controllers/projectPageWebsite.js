const getStudentProjectQuery = require('../database/queries/getStudentProject');

exports.get = (request, response) => {
  const { id } = request.params;
  getStudentProjectQuery(id, (err, res) => {
    if (err) {
      return response.render('projectPageWebsite', {
        err: 'There are No Project!',
        layout: 'webSite',
        styleFile: 'projectWebsite',
        jsFile: 'cohortPageWebsite',
      });
    }
    return response.render('projectPageWebsite', {
      res,
      layout: 'webSite',
      styleFile: 'projectWebsite',
      jsFile: 'cohortPageWebsite',
    });
  });
};
