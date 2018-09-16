const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const loginQuery = require('../database/queries/login');

exports.get = (request, response) => {
  response.render('login', { layout: 'login',style: 'login', js: 'login' });
};

exports.post = (request, response) => {
  const { usernameValue } = request.body;
  const { passwordValue } = request.body;
  loginQuery(usernameValue, (error, result) => {
    if (error) return response.send(JSON.stringify({ err: 'Login_error !' }));
    if (result[0]) {
      return bcrypt.compare(passwordValue, result[0].password, (err, res) => {
        if (err) return response.send(JSON.stringify({ err: 'Error!' }));
        if (res === false) return response.send(JSON.stringify({ err: 'Wrong Password !' }));
        const data = {
          admin: 'admin',
        };
        return sign(data, process.env.SECRET, (signError, cookie) => {
          if (signError) return response.send(JSON.stringify({ err: 'Error!' }));
          response.setHeader(
            'set-cookie',
            `data=${cookie};httpOnly;Max-Age=900099`,
          );
          return response.send(JSON.stringify({ err: null, message: 'Welcome' }));
        });
      });
    }
    return response.send(JSON.stringify({ err: 'Wrong username/password' }));
  });
};