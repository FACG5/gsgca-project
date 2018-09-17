const sub = document.getElementById('sub');

const subMenu = () => {
  sub.classList.toggle('sub-menu--visible');
};

const deleteButtonFunction = (button, route, redirectLocation, dataOfDelete) => {
  button.addEventListener('click', (e) => {
    swal({
      title: 'Are you sure ?',
      text:
        'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(route, {
          method: 'DELETE',
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
