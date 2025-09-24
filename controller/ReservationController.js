const asyncHandler = require("express-async-handler");
const {
  Reservation,
  ValidateCreateReservation,
  ValidateUpdateReservation,
} = require("../models/Resrervation");

module.exports.CreateReservation = asyncHandler(async (req, res) => {
  const { error } = ValidateCreateReservation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  console.log(req.body);
  const reservation = new Reservation(req.body);
  await reservation.save();

  // Populate patient
  await reservation.populate("patient", "FirstName LastName email");

  console.log("Populated reservation:", reservation.patient); // هيك بتشوف إذا رجع الـ patient صحيح

  res.status(201).json(reservation);

  res.status(201).json(reservation);
});

module.exports.getReservation = asyncHandler(async (req, res) => {
  const { status, patient } = req.query;
  const filter = {};
  if (status) filter.Status = status;
  if (patient) filter.patient = patient;

  const list = await Reservation.find(filter).populate(
    "patient",
    "FirstName LastName email"
  );
  res.json(list);
});

module.exports.getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "patient",
    "FirstName LastName email"
  );
  if (!reservation)
    return res.status(404).json({ message: "reservation not found" });
  res.json(reservation);
});

module.exports.updateReservation = asyncHandler(async (req, res) => {
  const { error } = ValidateUpdateReservation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!reservation)
    return res.status(404).json({ message: "reservation not found" });
  res.json(reservation);
});

module.exports.cancelReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { Status: "cancelled" },
    { new: true }
  );
  if (!reservation)
    return res.status(404).json({ message: "Appointment not found" });
  res.json(reservation);
});
