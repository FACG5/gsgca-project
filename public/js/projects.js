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
const projectType = splitUrl[splitUrl.length - 3];
let projectTypeValue = '';
if (projectType.toLowerCase() === 'clients') {
  projectTypeValue = 0;
} else if (projectType.toLowerCase() === 'community') {
  projectTypeValue = 1;
}

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
  urlCheck(webLink, webError, 'Web Link is required');
});
gitLink.addEventListener('focusout', (e) => {
  urlCheck(gitLink, gitError, 'Github Link is required');
});
description.addEventListener('focusout', (e) => {
  check(description, descriptionError, 'Description is required');
});
imgUrl.addEventListener('focusout', (e) => {
  urlCheck(imgUrl, imgError, 'Image url is required');
});

addProjectButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkName = check(name, nameError, 'name is required');
  const checkDescription = check(description, descriptionError, 'Description is required');
  const checkGitLink = urlCheck(gitLink, gitError, 'Github Link is required');
  const checkWebLink = urlCheck(webLink, webError, 'Web Link is required');
  const checkImage = urlCheck(imgUrl, imgError, 'Image url is required');
  if (checkName && checkDescription && checkGitLink && checkWebLink && checkImage) {
    const nameVal = name.value;
    const descriptionVal = description.value;
    const webLinkVal = addhttps(webLink.value);
    const gitLinkVal = addhttps(gitLink.value);
    const imgUrlVal = addhttps(imgUrl.value);
    const newProject = {
      nameVal,
      descriptionVal,
      webLinkVal,
      gitLinkVal,
      imgUrlVal,
      cohortId,
      projectTypeValue,
    };
    fetch(`/admin/${projectType}/${cohortId}/newProject`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((response) => { response.json(); })
      .then((response) => {
        swal('Good job!', 'Add Successfully!', 'success').then((value) => {
          window.location = `/admin/${projectType}/${cohortId}/projects`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
deleteProjectButton.forEach((button) => {
  const deleteProjectData = { projectId: button.id, cohortId, projectTypeValue };
  const route = `/admin/community/${cohortId}/deleteProject`;
  const routeToRedirect = `/admin/${projectType}/${cohortId}/projects`;
  deleteButtonFunction(button, route, routeToRedirect, deleteProjectData);
});
