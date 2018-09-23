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
    const {
      name, description, cohort_name: cohortName, githublink: githubLink,
      websitelink: websiteLink,
    } = res.projectResult[0];
    const projectResult = {
      name, description, cohortName, githubLink, websiteLink,
    };

    return response.render('projectPageWebsite', {
      res,
      projectResult,
      layout: 'webSite',
      styleFile: 'projectWebsite',
      jsFile: 'cohortPageWebsite',
    });
  });
};
