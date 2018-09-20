const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const getCohortsQuery = require('../database/queries/getCohorts');
const { deleteCohort } = require('../database/queries/deleteCohort');
const { addCohorts } = require('../database/queries/addCohort');

const jsFile = ['cohort'];

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    if (err) {
      return response.render('cohort', {
        err: 'cannot get the cohorts !',
        styleFile: 'cohorts',
        jsFile,
        layout: 'adminLayout',
      });
    }
    return response.render('cohort', {
      res,
      styleFile: 'cohorts',
      cohort: 'active',
      jsFile,
      layout: 'adminLayout',
      title: 'Admin Panel | Cohorts',
    });
  });
};

exports.getStudents = (request, response) => {
  const { cohortId } = request.params;
  getCohortStudentsQuery(cohortId, (err, res) => {
    if (err) {
      return response.render('cohortStudents', {
        err: 'cannot get cohort Students !',
        styleFile: 'cohorts',
        jsFile,
        cohort: 'active',
        layout: 'adminLayout',
        title: 'Admin Panel | Students',
      });
    }

    if (res.length === 0) {
      return response.render('cohortStudents', {
        err: 'There are No Student in this Fac !',
        styleFile: 'cohorts',
        cohort: 'active',
        jsFile: ['cohortStudent'],
        layout: 'adminLayout',
        title: 'Admin Panel | Students',
      });
    }

    return response.render('cohortStudents', {
      res,
      cohortname: res[0].cohortname,
      styleFile: 'cohorts',
      jsFile: ['cohortStudent'],
      cohort: 'active',
      layout: 'adminLayout',
      title: 'Admin Panel | Students',
    });
  });
};

exports.deleteCohort = (req, response, next) => {
  const data = req.body;
  deleteCohort(data.deleteid)
    .then((results) => {
      const result = { err: null, message: 'Cohort Deleted !' };
      response.send(JSON.stringify(result));
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
      const result = { message: 'Cohort Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};
