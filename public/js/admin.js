const sub = document.getElementById('sub');
const loading = document.getElementById('loading');

const subMenu = () => {
  sub.classList.toggle('sub-menu--visible');
};

const deleteButtonFunction = (button, route, redirectLocation, dataOfDelete) => {
  button.addEventListener('click', (e) => {
    swal({
      title: 'Are you sure ?',
      text:
        'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(route, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(dataOfDelete),
        })
          .then(result => result.json())
          .then((result) => {
            if (result.err) return swal('Error', '', 'error');
            return swal(result.message, {
              icon: 'success',
            }).then((value) => {
              window.location = redirectLocation;
            });
          });
      }
    });
  });
};
const apiFetch = apiLink => new Promise((resolve, reject) => {
  fetch(apiLink, { method: 'GET' })
    .then((loading.style.display = 'block'))
    .then((response) => {
      loading.style.display = 'none';
      if (response.status !== 200) reject('Invalid_username');
      return response;
    })
    .then(response => response.json())
    .then((response) => {
      const { avatar_url: avatarUrl, html_url: htmlUrl } = response;
      const newStudent = {
        name: studentNameValue,
        username: gitHubUserNameValue,
        htmlUrl,
        avatarUrl,
        cohortId,
      };
      resolve(newStudent);
    });
});

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const check = (input, errorMessageElement, errMessage) => {
  if (!input.value) {
    displayErr(errorMessageElement, errMessage);
  } else {
    displayErr(errorMessageElement, '');
    return true;
  }
};
