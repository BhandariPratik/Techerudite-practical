import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const Booking = sequelize.define("Booking", {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  bookingType: {
    type: DataTypes.ENUM("Full Day", "Half Day", "Custom"),
    allowNull: false,
  },
  bookingSlot: {
    type: DataTypes.ENUM("First Half", "Second Half"),
    allowNull: true,
  },
  bookingTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

export default Booking;
