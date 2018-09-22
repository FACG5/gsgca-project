const getCohortsQuery = require('../database/queries/getCohorts');
const getProjectsQuery = require('../database/queries/getProjects');

exports.get = (request, response) => {
  const { projectsType } = request.params;
  if (
    projectsType.toLowerCase() === 'community'
    || projectsType.toLowerCase() === 'clients'
  ) {
    getCohortsQuery((err, res) => {
      if (err) {
        return response.render('adminProjectHome', {
          err: 'cannot get the cohorts !',
          styleFile: 'projects',
          jsFile: 'projects',
          layout: 'adminLayout',
          title: 'Admin Panel | Community Projects',
        });
      }
      const { projectsType } = request.params;
      return response.render('adminProjectHome', {
        res,
        styleFile: 'projects',
        jsFile: 'projects',
        layout: 'adminLayout',
        title: 'Admin Panel | Community Projects',
        projectsType,
        project: 'active',
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
exports.getProjects = (request, response) => {
  const { cohortId, projectsType } = request.params;
  if (
    projectsType.toLowerCase() === 'community'
    || projectsType.toLowerCase() === 'clients'
  ) {
    getProjectsQuery(cohortId, (err, res) => {
      if (err) {
        return response.render('communityProjects', {
          err: 'cannot get Projects !',
          styleFile: 'projects',
          jsFile: 'projects',
          layout: 'adminLayout',
          title: 'Admin Panel | Community Projects',
        });
      }
      let projectResult = '';
      if (projectsType.toLowerCase() === 'community') {
        projectResult = res.filter(project => project.project_type === 1);
      } else if (projectsType.toLowerCase() === 'clients') {
        projectResult = res.filter(project => project.project_type === 0);
      }
      if (projectResult.length === 0) {
        return response.render('projectsPage', {
          err: 'There is no projects in this cohort !',
          styleFile: 'projects',
          jsFile: 'projects',
          layout: 'adminLayout',
          title: `Admin Panel | ${projectsType} Projects`,
          projectsType,
          project: 'active',
        });
      }
      console.log(projectResult);
      
      return response.render('projectsPage', {
        projectResult,
        cohortname: res[0].cohortname,
        styleFile: 'projects',
        jsFile: 'projects',
        layout: 'adminLayout',
        title: `Admin Panel | ${projectsType} Projects`,
        projectsType,
        project: 'active',
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
