import { getUsers } from "../services/user.service.js";

export const getUsersController = async (req, res, next) => {
	try {
		const rta = await getUsers();
		res.json(rta);
	} catch (error) {
		next(error);
	}
};
