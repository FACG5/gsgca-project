const dbConnection = require('../dbConnection');

const getProjects = (id, cb) => {
  const sql = {
    text: 'select cohort.name AS cohortName, cohort.id as "cohortId",project.id, project.name, project.description, project.githublink, project.websitelink, project.img_url, project_type, cohort_id as "cohortId" FROM cohort join project ON project.cohort_id = cohort.id where cohort.id = $1',
    values: [id],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getProjects;
