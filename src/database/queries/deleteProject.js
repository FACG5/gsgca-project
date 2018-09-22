const dbConnection = require('../dbConnection');

const deleteProjectQuery = ({ projectId, cohortId, projectTypeValue }, cb) => {
  const sql = {
    text: 'DELETE FROM project where id=$1 AND cohort_id=$2 AND project_type = $3',
    values: [projectId, cohortId, projectTypeValue],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = deleteProjectQuery;
