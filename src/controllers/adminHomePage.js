exports.get = (request, response) => {
  response.render('adminHomePage', { adminHomePage: 'active', layout: 'adminLayout', title: 'Admin Panel | Home Page' });
};
exports.logout = (request, response) => {
  response.setHeader('Set-Cookie', 'data=0;httpOnly;Max-Age=0');
  response.redirect('/admin/login');
};
