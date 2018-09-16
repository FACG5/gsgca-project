const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const passwordValue = password.value;
  const loginDate = {
    usernameValue,
    passwordValue,
  };
  fetch('/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(loginDate),
    credentials: 'same-origin',
  })
    .then(result => result.json())
    .then((result) => {
      if (result.err) return swal('Error !', result.err, 'error');
      return swal('Welcome', ' ', 'success').then((value) => {
        window.location = '/admin';
      });
    })
    .catch(err => swal(err, ' ', 'error'));
});
