const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const config = require("../config");
const { ResponseHandler } = require("../utils");

const getTokenFromHeader = (request) => {
	if (request.headers.authorization && request.headers.authorization.split(" ")[0] === "Bearer") {
		return request.headers.authorization.split(" ")[1];
	}
	return null;
};

// Middleware to check if the user is authenticated
const required = async (request, response, next) => {
	const token = getTokenFromHeader(request);

	if (!token) {
		return ResponseHandler.badRequest(response, "No authorization token found!");
	}

	try {
		// Verify the token
		const payload = jwt.verify(token, config.secret);
		request.body.payload = { id: payload.id };
		return next();
	} catch (err) {
		return ResponseHandler.unauthorized(response, "Invalid token!");
	}
};

// Middleware to check if the user exists
const user = async (request, response, next) => {
	const { id } = request.body.payload;
	const user = await User.findById(id);
	if (!user) return ResponseHandler.badRequest(response, "User not found!");
	request.user = user;
	return next();
};

// Middleware to check if the user is an admin
const admin = async (request, response, next) => {
	const { id } = request.body.payload;
	const admin = await User.findById(id);

	// Check if the user exists and if they have an admin role
	if (!admin) return ResponseHandler.badRequest(response, "User not found!");
	if (admin.role !== "admin") {
		return ResponseHandler.unauthorized(response, "You are not authorized to access this resource.");
	}
	request.user = admin;
	return next();
};

module.exports = {
	required,
	user,
	admin, // Export the admin middleware
};
