const router = require("express").Router();
const {
  GetAllUser,
  GetUser,
  deleteUser,
} = require("../controller/AdminController");
const { UpdateCtrl } = require("../controller/AuthController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.put("/:id", verifyTokenAndAuthorization, UpdateCtrl);
router.get("/", verifyTokenAndAdmin, GetAllUser);
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, UpdateCtrl)
  .get(verifyTokenAndAuthorization, GetUser)
  .delete(verifyTokenAndAuthorization, deleteUser);
module.exports = router;
