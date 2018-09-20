const getStudentProjectQuery = require('../database/queries/getStudentProject');
const getCohortStudentsQuery = require('../database/queries/getCohortStudents');

exports.get = (request, response) => {
  const data = request.params;
  const { id, cohortId } = data;
  getStudentProjectQuery(id, (error, res) => {
    getCohortStudentsQuery(cohortId, (err, results) => {
      if (err) {
        return response.render('studentsProject', {
          title: 'Admin Panel |  Student Project',
          styleFile: 'projects',
          jsFile: ['projects'],
          layout: 'adminLayout',
          project: 'active',
          err: 'No Student of Cohort',
        });
      }
      if (error) {
        return response.render('studentsProject', {
          title: 'Admin Panel |  Student Project',
          styleFile: 'projects',
          jsFile: ['projects'],
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
        jsFile: ['projects'],
        layout: 'adminLayout',
        project: 'active',
      });
    });
  });
};
