const {
  CreateReservation,
  getReservation,
  updateReservation,
  cancelReservation,
  getReservationById,
} = require("../controller/ReservationController.js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken.js");
const router = require("express").Router();

router.post("/",verifyTokenAndAuthorization ,CreateReservation);
router.get("/", verifyTokenAndAuthorization,getReservation);
router.get("/:id",verifyTokenAndAdmin, getReservationById);
router.put("/:id", verifyTokenAndAdmin,updateReservation);
router.delete("/:id",verifyTokenAndAuthorization ,cancelReservation);

module.exports = router;