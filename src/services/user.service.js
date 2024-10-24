import { conflict } from "@hapi/boom";
import { User } from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
	const users = await User.find();
	return users;
};

export const registerUser = async (userData) => {
	const { name, email, password } = userData;

	const userExists = await User.findOne({ email });
	if (userExists) throw conflict("User already exists");
	const newUser = new User({ name, email, password });
	const savedUser = await newUser.save();

	const { password: pwd, ...userWithoutPassword } = savedUser.toObject();
	return userWithoutPassword;
};

export const findUserByEmail = async (email) => {
	const user = await User.findOne({ email });
	return user;
};
