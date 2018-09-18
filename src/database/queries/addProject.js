const dbConnection = require('../db_connection');

const addProjectQuery = (newProject, cb) => {
  const sql = {
    text: 'INSERT INTO project (name, description, githublink, websitelink, imgURL, cohort_id) values ($1,$2,$3,$4,$5,$6) RETURNING name',
    values: [newProject.nameVal, newProject.descriptionVal, newProject.gitLinkVal,
      newProject.webLinkVal, newProject.imgUrlVal, newProject.cohortId],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = addProjectQuery;
