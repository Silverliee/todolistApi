const app = require("./app");
const http = require("http");

const normalizePort = val => {
	const port = parseInt(val, 10);
	if(isNaN(port)) {
		// named pipe
		return val;
	}
	if(port >= 0) {
		// port number
		return port;
	}
	return false;
};

const onError = error => {
	if(error.syscall !== "listen") {
		throw error;
	}
	let addr;
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
	switch(error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const port = normalizePort(3000);
console.log("listening the port : " + port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port);