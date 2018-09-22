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
        return response.render('studentsProject', {
          results,
          res
          // : {
          //   studentName: res.student_name,
          //   studentProjectId: res.student_projectId,
          // }
          ,
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
      const result = { err: null, message: 'Student Added !' };
      response.send(JSON.stringify(result));
    })
    .catch((error) => {
      const err = ' This Student is Already Exists';
      response.send(JSON.stringify(err));
    });
};
