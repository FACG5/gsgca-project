const dbConnection = require('../db_connection');

const getProjects = (id, cb) => {
  const sql = {
    text: 'select cohort.name AS cohortName, cohort.id as cohortId, project.* FROM cohort join project ON project.cohort_id = cohort.id where cohort.id = $1',
    values: [id],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getProjects;
