const addProject = require('../database/queries/addProject');

exports.post = (request, response) => {
  addProject(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, res }));
  });
};
