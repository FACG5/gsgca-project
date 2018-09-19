const getCohortStudents = require('./getCohortStudents');
const { getCohortdata } = require('./getCohort');
const getProjects = require('./getProjects');

const getCohortProejctQuery = (id, cb, next) => getProjects(id, (err, projectResults) => {
  if (err) return cb(err.DETAIL);
  return getCohortStudents(id, (error, studentResults) => {
    if (error) return cb(err.DETAIL);
    return getCohortdata(id)
      .then((cohortResults) => {
        cb(null, { projectResults, studentResults, cohortResults });
      })
      .catch((errors) => {
        next(errors);
      });
  });
});
module.exports = getCohortProejctQuery;
