import { compare, genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await genSalt(10);

	this.password = await hash(this.password, salt);
	next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export { User, UserSchema };
