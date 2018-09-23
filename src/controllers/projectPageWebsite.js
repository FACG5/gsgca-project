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
    if (!res || res.projectResult.length === 0) {
      return response.status(404).render('error', {
        errorMessage: 'Project Not Found !',
        layout: 'error',
        style: 'error',
        statusCode: 404,
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
      title: `Code Acadmy | ${res.projectResult[0].name}`,
      layout: 'webSite',
      styleFile: 'projectWebsite',
      jsFile: 'cohortPageWebsite',
    });
  });
};
