import { Error as MongooseError } from "mongoose";
import { logger } from "../lib/logger.js";

export function logErrors(error, req, res, next) {
	logger.error(error.message);
	next(error);
}

export function errorHandler(error, req, res, next) {
	logger.error(error.message);
	res.status(500).json({
		message: error.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
	});
}

export function boomErrorHandler(error, req, res, next) {
	if (error.isBoom) {
		const { output } = error;
		res.status(output.statusCode).json(output.payload);
	} else {
		next(error);
	}
}

export function mongoErrorHandler(err, req, res, next) {
	if (err instanceof MongooseError.ValidationError) {
		res.status(400).json({
			statusCode: 400,
			message: err.name,
			errors: err.errors, // Errores de validación específicos
		});
	} else if (err instanceof MongooseError.CastError) {
		// Errores al hacer "cast" de un valor (por ejemplo, ID incorrecto)
		res.status(400).json({
			statusCode: 400,
			message: `Invalid ${err.path}: ${err.value}`,
		});
	} else {
		next(err);
	}
}
