const addProject = require('../database/queries/addProject');
const deleteProject = require('../database/queries/deleteProject');

exports.post = (request, response) => {
  addProject(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, res }));
  });
};

exports.delete = (request, response) => {
  deleteProject(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, message: 'Project Deleted !' }));
  });
};
