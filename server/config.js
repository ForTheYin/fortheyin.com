var express = require('express');

module.exports = function (app) {
  app.enable('trust proxy');
  app.use(express.static('public'));
  app.set('port', (process.env.PORT || 9000));

  app.listen(app.get('port'), function () {
    console.log('App is running on port', app.get('port'));
  });
};
