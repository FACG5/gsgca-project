const editCohort = document.getElementById('editCohort');
const names = document.getElementById('name');
const descriptions = document.getElementById('description');
const githubLinks = document.getElementById('githublink');
const imgURls = document.getElementById('imgURl');
const nameError = document.getElementById('nameerror');
const descriptionsError = document.getElementById('deserror');
const githubError = document.getElementById('giterror');
const imgError = document.getElementById('imgerror');

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const checkName = () => {
  if (!names.value) {
    displayErr(nameError, 'name Cohort is required');
  } else {
    displayErr(nameError, '');
    return true;
  }
};

const checkDescriptions = () => {
  if (!descriptions.value) {
    displayErr(descriptionsError, 'Description Cohort is required');
  } else {
    displayErr(descriptionsError, '');
    return true;
  }
};

const checkGithublink = () => {
  if (!githubLinks.value) {
    displayErr(githubError, 'Github Link Cohort is required');
  } else {
    displayErr(githubError, '');
    return true;
  }
};

const checkImage = () => {
  if (!imgURls.value) {
    displayErr(imgError, 'Image Cohort is required');
  } else {
    displayErr(imgError, '');
    return true;
  }
};

names.addEventListener('focusout', checkName);
descriptions.addEventListener('focusout', checkDescriptions);
githubLinks.addEventListener('focusout', checkGithublink);
imgURls.addEventListener('focusout', checkImage);

editCohort.addEventListener('click', () => {
  if (checkName() && checkDescriptions() && checkGithublink() && checkImage()) {
    const URL = window.location.href;
    const splitUrl = URL.split('/');
    const cohortId = splitUrl[splitUrl.length - 1];
    const name = names.value;
    const description = descriptions.value;
    const githubLink = githubLinks.value;
    const imgUrl = imgURls.value;
    const data = {
      name, description, githubLink, imgUrl, cohortId,
    };
    fetch(`/admin/cohorts/edit/${cohortId}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((response) => {
        swal('Good job!', response.message, 'success').then((value) => {
          window.location = '/admin/cohorts';
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
