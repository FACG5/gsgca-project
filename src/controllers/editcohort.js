
const { getCohortdata } = require('../database/queries/getCohort');
const { editCohorts } = require('../database/queries/editcohort');

exports.getCohortData = (req, response, next) => {
  const { id } = req.params;
  getCohortdata(id)
    .then((results) => {
      response.render('editcohort', {
        title: 'Cohort', style: ['main', 'cohort'], js: ['main', 'editCohort'], results,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editCohort = (req, response, next) => {
  const data = req.body;
  const cohortID = JSON.parse(req.params.id);
  const {
    name, description, githublink, imgURl,
  } = data;
  editCohorts(name, description, githublink, imgURl, cohortID)
    .then((results) => {
      response.render('cohort', {
        title: 'Cohort', style: ['main', 'cohort'], js: ['main', 'cohort', 'delCohort'], results,
      });
    })
    .catch((err) => {
      next(err);
    });
};
