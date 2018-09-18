const getCohortsQuery = require('../database/queries/getCohorts');

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
