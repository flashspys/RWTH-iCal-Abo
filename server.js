var http = require("http");
var needle = require("needle");
var moment = require('moment');
var url = require('url');

var server = http.createServer(function (req, res) {

  var loginCookies = [];
  var query = url.parse(req.url, true).query;

  if (!!query.user && !!query.password) {
    // Required arguments for login
    var data = {
      u: query.user,      // Username
      p: query.password,  // Password
    };

    // Login with username/password
    needle.post("https://www.campus.rwth-aachen.de/office/views/campus/redirect.asp", data, {}, function (error, response) {

      var cookies = response.headers['set-cookie'];
      cookies.forEach(function (item) {

        // Because the server send some metadata we only need the first part of each Cookie.
        loginCookies.push(item.split(";")[0]);

      });

      var options = {headers: {Cookie: loginCookies.join(";")}}; // Add the cookies to the header

      var start = moment().subtract(1, 'Month').format('DD.MM.YYYY');
      var end   = moment().add(8, 'Month').format('DD.MM.YYYY');

      // Download iCal and serve it
      needle.get('https://www.campus.rwth-aachen.de/office/views/calendar/iCalExport.asp?startdt='+start+'&enddt='+end+'%2023:59:59', options, function (error, response) {
        res.setHeader('Content-Type', 'text/calendar; charset=UTF-8'); // Set correct Content-Type
        res.setHeader('X-PUBLISHED-TTL', 'PT1H'); // Set update interval to 1h (Exchange MS)
        res.setHeader('REFRESH-INTERVAL', 'PT1H'); // Offical Spec
        res.write(response.body);
        res.end();
      });

    });
  } else {
    res.end('Du hast die Parameter user und/oder password vergessen.');
  }

});

server.listen(2014);

console.log("Server is listening");

