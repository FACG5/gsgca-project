
const { getCohortdata } = require('../database/queries/getCohort');
const { editCohorts } = require('../database/queries/editCohorts');

const jsFile = ['cohort', 'delCohort'];

exports.getCohortData = (req, response, next) => {
  const { id } = req.params;
  getCohortdata(id)
    .then((results) => {
      response.render('editcohort', {
        title: 'Cohort', styleFile: 'cohorts', jsFile: ['editCohort'], layout: 'adminLayout', results,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editCohort = (req, response, next) => {
  const data = req.body;
  editCohorts(data)
    .then((results) => {
      response.send(JSON.stringify({ err: null, message: 'Edit Successfully!' }));
    })
    .catch((err) => {
      next(err);
    });
};
