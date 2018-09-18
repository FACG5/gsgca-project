const addStudent = require('../database/queries/addCohortStudent');
const deleteStudent = require('../database/queries/deleteCohortStudent');

exports.post = (request, response) => {
  addStudent(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, message: `New Stuent Added , with Name ${res[0].name}` }));
  });
};

exports.delete = (request, response) => {
  deleteStudent(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, message: 'Student Deleted !' }));
  });
};
