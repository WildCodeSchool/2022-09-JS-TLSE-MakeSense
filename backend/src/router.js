const express = require("express");

const router = express.Router();
const usersControllers = require("./controllers/usersControllers");
const decisionsControllers = require("./controllers/decisionsControllers");
const commentsControllers = require("./controllers/commentsControllers");
const groupsControllers = require("./controllers/groupsControllers");
const expertsControllers = require("./controllers/expertsControllers");
const impactedControllers = require("./controllers/impactedControllers");
const langControllers = require("./controllers/langControllers");
const { validateUser } = require("./midleware/validator");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./midleware/Password");
const scriptfs = require("./scripts/fs");

router.post("/addlang", langControllers.add);

router.use(express.json());
router.get("/lang", langControllers.langlist);
router.get("/alllang", langControllers.alllang);
router.post("/readfs", scriptfs.readallfiles);
router.post("/login", usersControllers.login, verifyPassword);
router.post("/register", validateUser, hashPassword, usersControllers.add);

router.use(verifyToken);

router.get("/decisions", decisionsControllers.browse);
router.get("/decisions/:id", decisionsControllers.read);
router.post("/decisions", decisionsControllers.add);
router.put("/decisions/status/:id/:status", decisionsControllers.statusedit);

router.post("/comments", commentsControllers.add);
router.get("/comments/:id", commentsControllers.browseWithDecisionId);

router.get("/groups", groupsControllers.browse);
router.post("/groups", groupsControllers.add);
router.delete("/groups/:id", groupsControllers.destroy);

router.post("/impacted", impactedControllers.add);
router.get("/impacted/:id", impactedControllers.read);
router.post("/experts", expertsControllers.add);
router.get("/experts/:id", expertsControllers.read);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", validateUser, hashPassword, usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
