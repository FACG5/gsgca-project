const dbConnection = require('../db_connection');

const getCohortStudentsQuery = (id, cb) => {
  console.log(id);
  
  console.log(545);
  
  const sql = {
    text: 'select cohort.name AS cohortName, student.id,student.cohort_id,student.githublink,student.imgurl,student.name,student.username from student join cohort ON cohort.id = student.cohort_id where cohort.id = $1',
    values: [id],
  };
  dbConnection.query(sql, (err, result) => {
    if (err) return cb(err.DETAIL);
    return cb(null, result.rows);
  });
};

module.exports = getCohortStudentsQuery;
