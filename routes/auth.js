const router = require("express").Router();
const { RegisterCtrl, LoginCtrl } = require("../controller/AuthController");

router.post("/rigister", RegisterCtrl);
router.post("/login", LoginCtrl)

module.exports = router;
