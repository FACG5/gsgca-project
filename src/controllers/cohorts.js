const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const getCohortsQuery = require('../database/queries/getCohorts');
const { deleteCohort } = require('../database/queries/deleteCohort');
const { addCohorts } = require('../database/queries/addCohort');

const jsFile = ['cohort', 'delCohort'];

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('cohort', {
        err: 'cannot get the cohorts !', styleFile: 'cohorts', jsFile, layout: 'adminLayout',
      });
    }
    return response.render('cohort', {
      res, styleFile: 'cohorts', jsFile, layout: 'adminLayout',
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
        jsFile,
        layout: 'main',
      });
    }

    if (res.length === 0) {
      return response.render('cohortStudents', {
        err: 'There are No Student in this Fac !',
        styleFile: 'cohorts',
        jsFile: ['cohortStudent'],
        layout: 'adminLayout',
      });
    }

    return response.render('cohortStudents', {
      res,
      cohortname: res[0].cohortname,
      styleFile: 'cohorts',
      jsFile: ['cohortStudent'],
      layout: 'adminLayout',
    });
  });
};

exports.deleteCohort = (req, response, next) => {
  const data = req.body;
  deleteCohort(data.deleteid)
    .then((results) => {
      response.send(JSON.stringify(results));
    })
    .catch((err) => {
      next(err);
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
