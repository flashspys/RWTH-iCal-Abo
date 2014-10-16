http = require("http");
server = http.createServer( function(req, res) {

var query = require('url').parse(req.url,true).query;

needle = require("needle");
data = {reqwaygguid: "", evgguid: "", size: 1024, u: query.user, p: query.password, login: "> Login", Newsletter: ""};
needle.post("https://www.campus.rwth-aachen.de/office/views/campus/redirect.asp", data, {}, function(error, response) {
	if(!error) {
		loginCookies = [];
		cookies = response.headers['set-cookie'];
		cookies.forEach(function(item){
			loginCookies.push(item.split(";")[0]);
		});

	} else {
		console.log(error);
	}
	cal(loginCookies.join(";"));
});

function cal(cookies) {

cookies = cookies || "";

console.log(cookies)

options = {headers:{Cookie: cookies}};
needle.get("https://www.campus.rwth-aachen.de/office/views/calendar/iCalExport.asp?startdt=01.10.2014&enddt=31.03.2015%2023:59:59", options, function(error, response) {
	// The Unicode converting is probably a dirty fix but it works. Otherwise some chars won't be displayed correctly.
	res.write(decode_utf8(response.body));
	res.end();
});
}

});
server.listen(2014);
console.log("Server is listening");

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}
