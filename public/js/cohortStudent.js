const addStd = document.getElementById('addStd');
const studentName = document.getElementById('studentName');
const gitHubUserName = document.getElementById('gitHubUserName');
const addStudentButton = document.getElementById('addStudentButton');
const url = window.location.href;
const spliturl = url.split('/');
const cohortId = spliturl[spliturl.length - 2];
const deleteStudentButton = document.querySelectorAll('.delete');

const showAddStudentDiv = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

addStudentButton.addEventListener('click', (e) => {
  e.preventDefault();
  studentNameValue = studentName.value;
  gitHubUserNameValue = gitHubUserName.value;
  if (studentNameValue.trim() && gitHubUserNameValue.trim()) {
    const apiLink = `https://api.github.com/users/${gitHubUserNameValue}`;
    apiFetch(apiLink)
      .then((result) => {
        fetch(`/admin/cohorts/${cohortId}/newStudent`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(result),
        })
          .then(result => result.json())   
          .then((result) => {
            if (result.err) {
              const { code } = result.err;
              const { detail } = result.err;
              if (code === '23505') return swal('Error', 'username is Exist !', 'error');
              // if (code === '22001') return swal('Error', 'Long data !', 'error');

              return swal('Error', detail, 'error');
            }
            return swal(result.message, ' ', 'success').then((value) => {
              window.location = `/admin/cohorts/${cohortId}/students`;
            });
          });
      })
      .catch((error) => {
        swal(error, '', 'error');
      });  
  } else {
    swal('Please Enter Data ! ! ', '', 'error');
  }
});

deleteStudentButton.forEach((button) => {
  const deleteStudentData = { stdId: button.id, cohortId };

  const route = `/admin/cohorts/${cohortId}/deleteStudent`;
  const routeToRedirect = `/admin/cohorts/${cohortId}/students`;
  deleteButtonFunction(button, route, routeToRedirect, deleteStudentData);
});
