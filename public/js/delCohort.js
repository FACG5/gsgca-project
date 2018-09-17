const del = document.getElementsByClassName('delete');

Array.prototype.forEach.call(del, (element) => {
  element.addEventListener('click', (event) => {
    swal({
      title: 'Are you sure ?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const deleteid = event.target.id;
          const data = {
            deleteid,
          };
          fetch('/admin/cohorts', {
            method: 'delete',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data),
          })
            .then((response) => { response.json(); })
            .then((response) => {
              swal('deleted', {
                icon: 'success',
              }).then((value) => {
                JSON.stringify(response);
                window.location = '/admin/cohorts';
              });
            })
            .catch(error => swal(error, 'error', 'error'));
        } else {
          swal('Cohort is safe !');
        }
      });
  });
});
