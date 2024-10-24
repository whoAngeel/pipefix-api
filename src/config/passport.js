import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import config from "./config.js";
import { findUserByEmail } from "../services/user.service.js";
import { badData, unauthorized } from "@hapi/boom";

const JWT_SECRET = config.JWT_SECRET;

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				if (!email || !password) return done(badData(), false);
				const user = await findUserByEmail(email);
				if (!user) return done(unauthorized(), false);
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) return done(unauthorized(), false);
				const { password: pwd, ...userWithoutPassword } = user.toObject();
				done(null, userWithoutPassword);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET,
		},
		async (payload, done) => {
			return done(null, payload);
		}
	)
);
