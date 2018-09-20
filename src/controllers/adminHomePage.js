const getStatistics = require('../database/queries/statistics');

exports.get = (request, response) => {
  response.render('adminHomePage', { layout: 'adminLayout', title: 'Admin Panel | Home Page' });
};

exports.logout = (request, response) => {
  response.setHeader('Set-Cookie', 'data=0;httpOnly;Max-Age=0');
  response.redirect('/admin/login');
};

exports.getStatistics = (request, response) => {
  getStatistics((err, res) => {
    if (err) {
      return response.render('adminHomePage', {
        err: 'Cannot Get Statistics !',
        layout: 'adminLayout',
        title: 'Admin Panel | Home Page',
      });
    }
    return response.render('adminHomePage', {
      countCohort: res[0].count_cohort,
      countProject: res[0].count_project,
      countStudent: res[0].count_student,
      layout: 'adminLayout',
      title: 'Admin Panel | Home Page',
    });
  });
};
