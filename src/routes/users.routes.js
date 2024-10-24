import { Router } from "express";
import { getUsersController } from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsersController);
router.get("/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

export default router;
