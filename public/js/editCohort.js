const editCohort = document.getElementById('editCohort');
const names = document.getElementById('name');
const descriptions = document.getElementById('description');
const githubLinks = document.getElementById('githublink');
const imgURls = document.getElementById('imgURl');
const nameError = document.getElementById('nameerror');
const descriptionsError = document.getElementById('deserror');
const githubError = document.getElementById('giterror');
const imgError = document.getElementById('imgerror');

names.addEventListener('focusout', (e) => {
  check(names, nameError, 'name Cohort is required');
});
descriptions.addEventListener('focusout', (e) => {
  check(descriptions, descriptionsError, 'Description Cohort is required');
});
githubLinks.addEventListener('focusout', (e) => {
  urlCheck(githubLinks, githubError, 'Github Link Cohort is required');
});
imgURls.addEventListener('focusout', (e) => {
  urlCheck(imgURls, imgError, 'Image Cohort is required');
});

editCohort.addEventListener('click', () => {
  const checkname = check(names, nameError, 'name Cohort is required');
  const checkDescription = check(descriptions, descriptionsError, 'Description Cohort is required');
  const checkgitLink = urlCheck(githubLinks, githubError, 'Github Link Cohort is required');
  const checkImg = urlCheck(imgURls, imgError, 'Image Cohort is required');

  if (checkname && checkDescription && checkgitLink && checkImg) {
    const URL = window.location.href;
    const splitUrl = URL.split('/');
    const cohortId = splitUrl[splitUrl.length - 1];
    const name = names.value;
    const description = descriptions.value;
    const githubLink = addhttps(githubLinks.value);
    const imgUrl = addhttps(imgURls.value);
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
