module.exports = function(request, response, next) {
	if(!request.headers.authorization) {
		response.status(401);
		response.end();
		return;
	}

	if(request.headers.authorization != "Bearer " + process.env.TOKEN) {
		response.status(403);
		response.end();
		return;
	}

	next();
};