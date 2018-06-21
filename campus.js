const http = require("http");

server = http.createServer((req, res) => {

	loginCookies = [];
	var query = require('url').parse(req.url, true).query;
	needle = require("needle");

	// Required arguments for login
	data = {
		reqwaygguid: "",    // Don't know
		evgguid: "",        // Don't know
		size: 1024,         // Don't know
		u: query.user,      // Username
		p: query.password,  // Password
		login: "> Login",   // Don't know
		Newsletter: ""      // Don't know
	};

	needle.post("https://www.campus.rwth-aachen.de/office/views/campus/redirect.asp", data, {}, function (error, response) {

		var cookies = response.headers['set-cookie'];
		cookies.forEach(function (item) {
			loginCookies.push(item.split(";")[0]);
		});

		var options = {headers: {Cookie: loginCookies.join(";")}};

		needle.get("https://www.campus.rwth-aachen.de/office/views/calendar/iCalExport.asp?startdt=01.04.2018&enddt=30.09.2018%2023:59:59", options, function (error, response) {
			// The Unicode converting is probably a dirty fix but it works. Otherwise some chars won't be displayed correctly.
			res.write(decode_utf8(response.body));
			res.end();
		});

	});
});

server.listen(2018);
console.log("Server is listening");

function decode_utf8(s) {
	return decodeURIComponent(escape(s));
}
