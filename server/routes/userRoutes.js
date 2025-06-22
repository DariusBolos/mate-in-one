const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/userController");

router.get("/", controller.get);
router.post("/", controller.post);

module.exports = router;
