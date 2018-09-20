const addProject = require('../database/queries/addProject');
const deleteProject = require('../database/queries/deleteProject');
const getSingleProject = require('../database/queries/getSingleProject');
const editProject = require('../database/queries/editProject');

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

exports.getProject = (request, response) => {
  const { cohortId, projectId } = request.params;
  getSingleProject({ cohortId, projectId }, (err, res) => {
    if (err) {
      return response.render('editProject', {
        err: 'cannot get Project !',
        styleFile: 'projects',
        jsFile: 'editProject',
        layout: 'adminLayout',
        project: 'active',
        title: 'Admin Panel | Edit Projects',
      });
    }
    if (res.length === 0) {
      return response.render('editProject', {
        err: 'There is no project by this ID !',
        styleFile: 'projects',
        jsFile: 'editProject',
        layout: 'adminLayout',
        project: 'active',
        title: 'Admin Panel | Edit Projects',
      });
    }
    return response.render('editProject', {
      res,
      styleFile: 'projects',
      jsFile: 'editProject',
      layout: 'adminLayout',
      project: 'active',
      title: 'Admin Panel | Edit Projects',
    });
  });
};

exports.edit = (request, response) => {
  editProject(request.body, (err, res) => {
    if (err) return response.send(JSON.stringify({ err }));
    return response.send(JSON.stringify({ err: null, res }));
  });
};
