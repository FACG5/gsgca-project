const addStd = document.getElementById('addStd');
const studentName = document.getElementById('studentName');
const gitHubUserName = document.getElementById('gitHubUserName');
const addStudentButton = document.getElementById('addStudentButton');
const Url = window.location.href;
const splitUrl = Url.split('/');
const cohortId = splitUrl[splitUrl.length - 2];
const deleteStudentButton = document.querySelectorAll('.delete');


const showAddStudentDiv = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

addStudentButton.addEventListener('click', (e) => {
  e.preventDefault();

  studentNameValue = studentName.value;
  gitHubUserNameValue = gitHubUserName.value;
  if (studentNameValue.trim() !== 0 && gitHubUserNameValue.trim() !== 0) {
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
