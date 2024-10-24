import express from "express";
import cors from "cors";
import morgan from "morgan";

import config from "./config/config.js";
import { appRouter } from "./routes/index.js";
import { logger } from "./lib/logger.js";
import ConnectDb from "./config/database.js";
import {
	boomErrorHandler,
	errorHandler,
	logErrors,
	mongoErrorHandler,
} from "./middlewares/errors.handler.js";
import "./config/passport.js";

ConnectDb();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
	res.send("ok");
});

appRouter(app);

app.use(logErrors);
app.use(mongoErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.PORT, () => {
	logger.info(`Server running on  http://localhost:${config.PORT}/`);
});
