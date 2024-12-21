import { Router } from "express";

import { deleteUser, getUser, getUsers, postUser, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.get("/:cognitoId", getUser);
router.delete("/:cognitoId", deleteUser);
router.put("/:cognitoId", updateUser);

export default router;
