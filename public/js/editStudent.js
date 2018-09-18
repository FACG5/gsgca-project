const Url = window.location.href;
const splitUrl = Url.split('/');
const cohortId = splitUrl[splitUrl.length - 3];
const editStudentButton = document.getElementsByClassName('editButton');
const newUsername = document.getElementById('username');
const newName = document.getElementById('name');
let studentNameValue = '';
let gitHubUserNameValue = '';

editStudentButton[0].addEventListener('click', (e) => {
  studentNameValue = newName.value;
  gitHubUserNameValue = newUsername.value;
  if (studentNameValue.trim() !== 0 && gitHubUserNameValue.trim() !== 0) {
    const apiLink = `https://api.github.com/users/${gitHubUserNameValue}`;
    apiFetch(apiLink)
      .then((result) => {
        fetch(
          `/admin/cohorts/${cohortId}/editStudent/${editStudentButton[0].id}`,
          {
            method: 'PUT',
            credentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(result),
          },
        )
          .then(result => result.json())
          .then((result) => {
            if (result.err) {
              const { code } = result.err;
              const { detail } = result.err;
              if (code === '23505') {return swal("Error", "username is Exist !", "error");}
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
