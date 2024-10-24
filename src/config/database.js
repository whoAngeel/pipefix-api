import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "../lib/logger.js";

const ConnectDb = async () => {
	try {
		await mongoose
			.connect(config.DB_URL)
			.then(logger.info("Database connected successfully ✅✅✅"));
	} catch (error) {
		logger.error("Database connection failed ❌❌❌");
		process.exit(1);
	}
};

export default ConnectDb;
