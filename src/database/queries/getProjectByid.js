const dbConnection = require('../db_connection');

const getProjectByid = (id, cb) => {
  const sql = {
    text: 'select project.* , cohort.name AS cohort_name FROM  project join cohort on cohort.id = project.cohort_id where project.id = $1',
    values: [id],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.rows);
  });
};

module.exports = getProjectByid;
