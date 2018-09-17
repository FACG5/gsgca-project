const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const getCohortsQuery = require('../database/queries/getCohorts');
const { addCohorts } = require('../database/queries/addCohort');


exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('cohort', {
        err: 'cannot get the cohorts !', styleFile: 'cohorts', jsFile: 'cohort', layout: 'adminLayout',
      });
    }
    return response.render('cohort', {
      res, styleFile: 'cohorts', jsFile: 'cohort', layout: 'adminLayout',
    });
  });
};


exports.getStudents = (request, response) => {
  const { cohortID } = request.params;
  getCohortStudentsQuery(cohortID, (err, res) => {
    if (err) {
      return response.render('cohortStudents', {
        err: 'cannot get cohort Students !',
        styleFile: 'cohorts',
        jsFile: 'cohort',
        layout: 'main',
      });
    }

    if (res.length === 0) {
      return response.render('cohortStudents', {
        err: 'There are No Student in this Fac !',
        styleFile: 'cohorts',
        jsFile: 'cohortStudent',
        layout: 'adminLayout',
      });
    }

    return response.render('cohortStudents', {
      res,
      cohortname: res[0].cohortname,
      styleFile: 'cohorts',
      jsFile: 'cohortStudent',
      layout: 'adminLayout',
    });
  });
};

exports.addCohort = (req, response, next) => {
  const data = req.body;
  const {
    name, description, githublink, imgURl,
  } = data;
  addCohorts(name, description, githublink, imgURl)
    .then((results) => {
      response.render('cohort', {
        title: 'Cohort', style: ['main', 'cohort'], js: ['main', 'cohort', 'delCohort'], results,
      });
    })
    .catch((err) => {
      next(err);
    });
};
