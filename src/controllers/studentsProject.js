const getStudentProjectQuery = require('../database/queries/getStudentProject');
const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const { deleteStdProjectQuery } = require('../database/queries/deleteStudentProject');
const { addStdProjectQuery } = require('../database/queries/addStudentProject');

exports.get = (request, response) => {
  const data = request.params;
  const { id, cohortId, projectsType } = data;
  if (
    projectsType.toLowerCase() === 'community'
    || projectsType.toLowerCase() === 'clients'
  ) {
    getStudentProjectQuery(id, (error, res) => {
      getCohortStudentsQuery(cohortId, (err, results) => {
        if (err) {
          return response.render('studentsProject', {
            title: 'Admin Panel |  Student Project',
            styleFile: 'projects',
            jsFile: ['studentProject'],
            layout: 'adminLayout',
            project: 'active',
            err: 'No Student of Cohort',
          });
        }
        if (error) {
          return response.render('studentsProject', {
            title: 'Admin Panel |  Student Project',
            styleFile: 'projects',
            jsFile: ['studentProject'],
            layout: 'adminLayout',
            project: 'active',
            error: 'No Student of Project',
          });
        }
        if (!results || results.length === 0) {
          return response.status(404).render('error', {
            errorMessage: 'Project Not Found !',
            layout: 'error',
            style: 'error',
            statusCode: 404,
          });
        }
        return response.render('studentsProject', {
          results,
          res,
          title: 'Admin Panel |  Student Project',
          styleFile: 'projects',
          jsFile: ['studentProject'],
          layout: 'adminLayout',
          project: 'active',
        });
      });
    });
  } else {
    response.status(404).render('error', {
      layout: 'error',
      statusCode: 404,
      errorMessage: 'Page not found',
      style: ['error'],
    });
  }
};


exports.deleteStudentProject = (req, response, next) => {
  const data = req.body;
  deleteStdProjectQuery(data.studentProject)
    .then((results) => {
      const result = { err: null, message: 'Student Deleted !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

exports.addStudentProject = (req, response, next) => {
  const data = req.body;
  addStdProjectQuery(data)
    .then((results) => {
      const result = { errorMessage: null, message: 'Student Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((error) => {
      const errorMessage = error.detail;
      if (error.code === '23505') {
        const result = { errorMessage: 'This Student is Already Exists' };
        return response.send(JSON.stringify(result));
      }
      const result = { errorMessage };
      return response.send(JSON.stringify(result));
    });
};
