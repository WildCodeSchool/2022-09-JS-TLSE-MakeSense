const express = require("express");

const router = express.Router();
const usersControllers = require("./controllers/usersControllers");
const decisionsControllers = require("./controllers/decisionsControllers");
const commentsControllers = require("./controllers/commentsControllers");

const langControllers = require("./controllers/langControllers");
const { validateUser } = require("./midleware/validator");
const {
  hashPassword,
  verifyPassword,
  // verifyToken,
} = require("./midleware/Password");
const scriptfs = require("./scripts/fs");

router.use(express.json());
router.get("/lang", langControllers.langlist);
router.post("/readfs", scriptfs.readallfiles);
router.post("/login", usersControllers.login, verifyPassword);
router.post("/register", validateUser, hashPassword, usersControllers.add);

router.post("/decisions", decisionsControllers.add);
router.get("/decisions", decisionsControllers.browse);
router.get("/decisionpage/:id", decisionsControllers.read);

router.post("/comments", commentsControllers.add);
// router.use(verifyToken);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
