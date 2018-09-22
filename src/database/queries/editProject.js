const dbConnection = require('../dbConnection');

const editProjectsQuery = (newProject, cb) => {
  const sql = {
    text: 'UPDATE project SET name = $1, description = $2, githublink = $3, websitelink = $4, img_url = $5, cohort_id = $6 WHERE id = $7 and project_type =$8',
    values: [newProject.nameVal, newProject.descriptionVal,
      newProject.gitLinkVal, newProject.webLinkVal, newProject.imgUrlVal,
      newProject.cohortId, newProject.projectId, newProject.projectTypeValue],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = editProjectsQuery;
