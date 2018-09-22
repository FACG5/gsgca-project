const dbconnection = require('../dbConnection');

const addStdProjectQuery = data => new Promise((resolve, reject) => {
  const { studentId, projectId } = data;
  const sql = {
    text: 'INSERT INTO std_project (std_id, project_id) VALUES ($1, $2) ;',
    values: [studentId, projectId],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { addStdProjectQuery };
