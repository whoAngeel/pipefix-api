import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user._id, name: user.name, email: user.email },
		config.JWT_SECRET,
		{ expiresIn: "14m" }
	);
};
export const generateRefreshToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			name: user.name,
			email: user.email,
		},
		config.JWT_SECRET,
		{ expiresIn: "7d" }
	);
};
