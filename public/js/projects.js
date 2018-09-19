const student = document.getElementById('student');
const addStd = document.getElementById('addStd');
const addPro = document.getElementById('addPro');
const name = document.getElementById('name');
const webLink = document.getElementById('webLink');
const gitLink = document.getElementById('gitLink');
const imgUrl = document.getElementById('imgUrl');
const description = document.getElementById('description');
const nameError = document.getElementById('nameError');
const descriptionError = document.getElementById('descriptionError');
const gitError = document.getElementById('gitError');
const webError = document.getElementById('webError');
const imgError = document.getElementById('imgError');
const addProjectButton = document.getElementById('addproj');
const URL = window.location.href;
const splitUrl = URL.split('/');
const cohortId = splitUrl[splitUrl.length - 2];
const deleteProjectButton = document.querySelectorAll('.delete');

const students = () => {
  student.classList.toggle('sectionstd--visible');
};

const addProject = () => {
  addPro.classList.toggle('sectionAddPro--visible');
};

const addStudents = () => {
  addStd.classList.toggle('sectionAddstd--visible');
};

name.addEventListener('focusout', (e) => {
  check(name, nameError, 'name is required');
});
webLink.addEventListener('focusout', (e) => {
  check(webLink, webError, 'Web Link is required');
});
gitLink.addEventListener('focusout', (e) => {
  check(gitLink, gitError, 'Github Link is required');
});
description.addEventListener('focusout', (e) => {
  check(description, descriptionError, 'Description is required');
});
imgUrl.addEventListener('focusout', (e) => {
  check(imgUrl, imgError, 'Image url is required');
});

addProjectButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkName = check(name, nameError, 'name is required');
  const checkDescription = check(description, descriptionError, 'Description is required');
  const checkGitLink = check(gitLink, gitError, 'Github Link is required');
  const checkWebLink = check(webLink, webError, 'Web Link is required');
  const checkImage = check(imgUrl, imgError, 'Image url is required');
  if (checkName && checkDescription && checkGitLink && checkWebLink && checkImage) {
    const nameVal = name.value;
    const descriptionVal = description.value;
    const webLinkVal = webLink.value;
    const gitLinkVal = gitLink.value;
    const imgUrlVal = imgUrl.value;

    const newProject = {
      nameVal,
      descriptionVal,
      webLinkVal,
      gitLinkVal,
      imgUrlVal,
      cohortId,
    };

    fetch(`/admin/community/${cohortId}/newProject`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Add Successfully!', 'success').then((value) => {
          window.location = `/admin/community/${cohortId}/projects`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
deleteProjectButton.forEach((button) => {
  const deleteProjectData = { projectId: button.id, cohortId };
  const route = `/admin/community/${cohortId}/deleteProject`;
  const routeToRedirect = `/admin/community/${cohortId}/projects`;
  deleteButtonFunction(button, route, routeToRedirect, deleteProjectData);
});
