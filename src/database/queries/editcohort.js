const dbconnection = require('../db_connection');

const editCohorts = (name, description, githublink, imgURl, cohortID) => new Promise((resolve, reject) => {
  const sql = {
    text: 'UPDATE cohort SET name = $1, description = $2, githublink = $3, imgURl = $4 WHERE id=$5;',
    values: [name, description, githublink, imgURl, cohortID],
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { editCohorts };
