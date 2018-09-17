const addStudent = require('../database/queries/addCohortStudent');

exports.post = (request, response) => {
  addStudent(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, message: `New Stuent Added , with Name ${res[0].name}` }));
  });
};
