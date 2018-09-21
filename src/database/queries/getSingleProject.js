const dbConnection = require('../dbConnection');

const getSingleProject = ({ cohortId, projectId }, cb) => {
  const sql = {
    text: 'select cohort.name AS cohortName, cohort.id, project.* FROM cohort join project ON project.cohort_id = cohort.id where cohort.id = $1 and project.id = $2',
    values: [cohortId, projectId],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getSingleProject;
