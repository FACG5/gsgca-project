const getAllProjects = require('../database/queries/getAllProjects');

exports.get = (request, response) => {
  const { projectsType } = request.params;
  if (
    projectsType.toLowerCase() === 'community'
    || projectsType.toLowerCase() === 'clients'
  ) {
    getAllProjects((err, res) => {
      let projectResult = '';
      if (projectsType.toLowerCase() === 'community') {
        projectResult = res.filter(project => project.project_type === 1);
      } else if (projectsType.toLowerCase() === 'clients') {
        projectResult = res.filter(project => project.project_type === 0);
      }
      if (err) {
        return response.render('ProjectsPageWebStite', {
          err: 'cannot get the Projects !',
          styleFile: 'projectWebsite',
          layout: 'webSite',
          title: `Code Academy | ${projectsType} Projects`,
        });
      }
      return response.render('ProjectsPageWebStite', {
        projectResult,
        layout: 'webSite',
        projectsType,
        styleFile: 'projectWebsite',
        title: `Code Academy | ${projectsType} Projects`,
      });
    });
  } else {
    response.status(404).render('error', {
      layout: 'error',
      statusCode: 404,
      errorMessage: 'Page not found',
      style: ['error'],
    });
  }
};
