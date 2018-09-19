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
    const communityProjects = res.projectResults.filter(project => project.project_type === 1);
    const clientsProjects = res.projectResults.filter(project => project.project_type === 0);    
    return response.render('cohortPageWebsite', {
      res,
      communityProjects,
      clientsProjects,
      layout: 'webSite',
      styleFile: 'cohortPageWebsite',
      jsFile: 'cohortPageWebsite',
      title: 'Code Academy | Cohort Name',
    });
  });
};
