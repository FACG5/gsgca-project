const getStudentProjectQuery = require('../database/queries/getStudentProject');
const getCohortStudentsQuery = require('../database/queries/getCohortStudents');
const { deleteStdProjectQuery } = require('../database/queries/deleteStdProject');
const { addStdProjectQuery } = require('../database/queries/addStdProject');

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


exports.deleteStdProject = (req, response, next) => {
  const data = req.body;
  deleteStdProjectQuery(data.std_project)
    .then((results) => {
      const result = { err: null, message: 'Student Deleted !' };
      response.send(JSON.stringify(result));
    })
    .catch((err) => {
      next(err);
    });
};

exports.addStdProject = (req, response, next) => {
  const data = req.body;
  addStdProjectQuery(data)
    .then((results) => {
      const result = { err: null, message: 'Student Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((error) => {
      const err = ' This Student is Already Exists';
      response.send(JSON.stringify(err));
    });
};
