const express = require("express");

const router = express.Router();
const itemControllers = require("./controllers/itemControllers");
const langControllers = require("./controllers/langControllers");

const scriptfs = require("./scripts/fs");

router.post("/readfs", scriptfs.readallfiles);

router.get("/lang", langControllers.langlist);

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
