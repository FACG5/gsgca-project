const dbConnection = require('../dbConnection');

const getAllProjects = (cb) => {
  const sql = {
    text: 'select id , name , description , githublink , img_url, websitelink , project_type , cohort_id as "cohortId" from project',
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getAllProjects;
