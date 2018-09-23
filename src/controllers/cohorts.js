const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const getCohortsQuery = require('../database/queries/getCohorts');
const { deleteCohort } = require('../database/queries/deleteCohort');
const { addCohorts } = require('../database/queries/addCohort');

const jsFile = ['cohort'];

exports.get = (request, response) => {
  getCohortsQuery((err, res) => {
    const mappedResults = res.map((
      {
        id, name, description, githublink, img_url,
      },
    ) => (
      {
        id, name, description, githubLink: githublink, imgUrl: img_url,
      }
    ));
    if (err) {
      return response.render('cohort', {
        err: 'cannot get the cohorts !',
        styleFile: 'cohorts',
        jsFile,
        layout: 'adminLayout',
      });
    }
    return response.render('cohort', {
      mappedResults,
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
    const cohortStudentResult = res.map((
      {
        name, studentId, username, cohort_id, cohortname, githublink, img_url,
      },
    ) => ({
      name,
      studentId,
      userName: username,
      cohortId: cohort_id,
      cohortName: cohortname,
      githubLink: githublink,
      imgUrl: img_url,
    }));

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
      cohortStudentResult,
      cohortName: cohortStudentResult[0].cohortName,
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
