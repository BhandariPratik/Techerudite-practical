import Booking from '../models/booking.js';


export const createBooking = async (req, res) => {
  const { customerName, customerEmail, bookingDate, bookingType, bookingSlot, bookingTime } = req.body;
  const duplicate = await isBookingDuplicate(bookingDate, bookingType, bookingSlot);
  if (duplicate) return res.status(400).json({ message: "Duplicate booking not allowed" });

  const formattedDateTime = moment(bookingTime).format("YYYY-MM-DD HH:mm:ss");

  const booking = await Booking.create({
    customerName,
    customerEmail,
    bookingDate,
    bookingType,
    bookingSlot,
    bookingTime :formattedDateTime,
  });

  res.status(201).json({ message: "Booking created successfully", booking });
};

const isBookingDuplicate = async (date, type, slot) => {
  const existingBooking = await Booking.findOne({
    where: { bookingDate: date },
  });

  console.log('date--->',date)
  console.log('type--->',type)
  console.log('slot--->',slot)

  console.log("existing---->",existingBooking)

  if (existingBooking) {
    if (existingBooking.bookingType === "Full Day") {
      return true; 
    }

    if (type === "Half Day" && existingBooking.bookingSlot === slot) {
      return true; 
    }

    if (type === "Custom" && existingBooking.bookingTime) {
      return true; 
    }
  }

  return false;
};
