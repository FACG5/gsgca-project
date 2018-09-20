const getStatistics = require('../database/queries/statistics');

exports.get = (request, response) => {
  response.render('adminHomePage', { adminHomePage: 'active', layout: 'adminLayout', title: 'Admin Panel | Home Page' });
};

exports.logout = (request, response) => {
  response.setHeader('Set-Cookie', 'data=0;httpOnly;Max-Age=0');
  response.redirect('/admin/login');
};

exports.getStatistics = (request, response) => {
  getStatistics((err, res) => {
    const {
      count_cohort: conutCohort, count_project: countProject,
      count_student: countStudent,
    } = res[0];

    if (err) {
      return response.render('adminHomePage', {
        adminHomePage: 'active',
        err: 'Cannot Get Statistics !',
        layout: 'adminLayout',
        title: 'Admin Panel | Home Page',
      });
    }
    return response.render('adminHomePage', {
      adminHomePage: 'active',
      conutCohort,
      countProject,
      countStudent,
      layout: 'adminLayout',
      title: 'Admin Panel | Home Page',
    });
  });
};
