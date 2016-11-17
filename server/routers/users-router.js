const express = require('express');
const controllers = require('../controllers');

module.exports = app => {
  app.get('/users/register', controllers.user.loadRegisterPage);

  app.post('/users/register', controllers.user.registerUser);  
}