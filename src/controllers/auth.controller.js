import jwt from "jsonwebtoken";
import { registerUser } from "../services/user.service.js";
import config from "../config/config.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../services/auth.service.js";
import { badData, badRequest, forbidden, notFound } from "@hapi/boom";

export const register = async (req, res, next) => {
	try {
		const rta = await registerUser(req.body);
		res.status(201).json(rta);
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = req.user;
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		res.json({
			user,
			accessToken,
			refreshToken,
		});
	} catch (error) {
		next(error);
	}
};

export const refreshAccessToken = (req, res, next) => {
	const { refreshToken } = req.body;

	if (!refreshToken) throw badRequest("Refresh token is missing");
	jwt.verify(refreshToken, config.JWT_SECRET, (err, user) => {
		if (err) throw forbidden("Refresh token is invalid");
		const accessToken = generateAccessToken(user);
		res.json({ accessToken });
	});
};
