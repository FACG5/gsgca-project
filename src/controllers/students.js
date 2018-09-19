const addStudent = require('../database/queries/addCohortStudent');
const deleteStudent = require('../database/queries/deleteCohortStudent');
const updateStudent = require('../database/queries/updateStudent');
const getStudentData = require('../database/queries/getStudent');

exports.post = (request, response) => {
  addStudent(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    const nameOfStudent = res[0].name;
    return response.send(
      JSON.stringify({
        err: null,
        message: `New Stuent Added , with Name ${nameOfStudent}`,
      }),
    );
  });
};

exports.delete = (request, response) => {
  deleteStudent(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(
      JSON.stringify({ err: null, message: 'Student Deleted !' })
    );
  });
};

exports.put = (request, response) => {
  const { id } = request.params;
  updateStudent(request.body, id, (err, result) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(
      JSON.stringify({ err: null, message: 'Student Updated !' }),
    );
  });
};

exports.editPage = (request, response) =>{
  const { id } = request.params;
  getStudentData(id)
    .then((results) => {
      response.render('editStudent', {
        title: 'Admin Panel | Editig Student',
        styleFile: 'cohorts',
        jsFile: ['editStudent'],
        layout: 'adminLayout',
        results,
        cohort: 'active',
      });
    })
    .catch((err) => {
      next(err);
    });
};
