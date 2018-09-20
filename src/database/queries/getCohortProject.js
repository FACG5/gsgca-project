const getCohortStudents = require('./getCohortStudents');
const { getCohortdata } = require('./getCohort');
const getProjects = require('./getProjects');

const getCohortProejctQuery = (cohortId, cb) => getProjects(cohortId, (err, projectResults) => {  
  if (err) return cb(err.DETAIL);
  return getCohortStudents(cohortId, (error, studentResults) => {
    if (error) return cb(err.DETAIL);
    return getCohortdata(cohortId)
      .then((cohortResults) => {
        cb(null, { projectResults, studentResults, cohortResults });
      })
      .catch((errors) => {
        cb(errors);
      });
  });
});
module.exports = getCohortProejctQuery;
