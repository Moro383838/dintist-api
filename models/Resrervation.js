const mongoose = require("mongoose");
const joi = require("joi");

const ReservationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    StartAt: {
      type: Date,
      required: true,
    },
    Status: {
      type: String,
      enum: ["booked", "confirmed", "completed", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
ReservationSchema.index({ Date: 1, StartAt: 1 }, { unique: true });
Reservation.syncIndexes()
  .then(() => console.log("Indexes synced "))
  .catch((err) => console.error("Index sync error ", err));

function ValidateCreateReservation(obj) {
  const schema = joi.object({
    StartAt: joi.date().iso().required(),
    patient: joi.string().required(),
    Date: joi.date().iso().required(),
  });
  return schema.validate(obj);
}

function ValidateUpdateReservation(obj) {
  const schema = joi.object({
    StartAt: joi.date().iso().required(),
    Date: joi.date().iso().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  Reservation,
  ValidateCreateReservation,
  ValidateUpdateReservation,
};
