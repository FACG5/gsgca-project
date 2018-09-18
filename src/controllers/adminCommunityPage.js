const getCohortsQuery = require('../database/queries/getCohorts');
const getProjectsQuery = require('../database/queries/getProjects');

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('adminCommunityPage', {
        err: 'cannot get the cohorts !',
        styleFile: 'projects',
        jsFile: 'projects',
        layout: 'adminLayout',
        title: 'Admin Panel | Community Projects',
      });
    }
    return response.render('adminCommunityPage', {
      res,
      styleFile: 'projects',
      jsFile: 'projects',
      layout: 'adminLayout',
      title: 'Admin Panel | Community Projects',
    });
  });
};
exports.getProjects = (request, response) => {
  const { cohortId } = request.params;
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
    if (res.length === 0) {
      return response.render('communityProjects', {
        err: 'There is no projects in this cohort !',
        styleFile: 'projects',
        jsFile: 'projects',
        layout: 'adminLayout',
        title: 'Admin Panel | Community Projects',
      });
    }
    return response.render('communityProjects', {
      res,
      cohortname: res[0].cohortname,
      styleFile: 'projects',
      jsFile: 'projects',
      layout: 'adminLayout',
      title: 'Admin Panel | Community Projects',
    });
  });
};
