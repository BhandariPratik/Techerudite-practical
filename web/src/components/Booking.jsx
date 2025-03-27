import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import useApi from "../hook/useApi";

const Booking = () => {
  const { register, handleSubmit, control, watch, formState: { errors },reset } = useForm();
  const [bookingTime, setBookingTime] = useState(new Date());
  const bookingType = watch("bookingType");
  const {apiCall,error}  = useApi()

 
  const onSubmit = async (data) => {
    console.log("Data------>", data);
    
    try {
      data['bookingTime'] = bookingTime
      const response = await apiCall("POST", `/bookings/`, data);
  
      if (response.success) { 
        alert("Booking Submitted Successfully!");
        reset()
      } else {
        alert(response.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Booking Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input
              type="text"
              {...register("customerName", { required: "Customer name is required" })}
              placeholder="John Doe"
              className="w-full p-2 border rounded-lg"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Email</label>
            <input
              type="email"
              {...register("customerEmail", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
              })}
              placeholder="email@example.com"
              className="w-full p-2 border rounded-lg"
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm">{errors.customerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Booking Date</label>
            <Controller
              control={control}
              name="bookingDate"
              rules={{ required: "Booking date is required" }}
              render={({ field }) => (
                <DatePicker
                minDate={new Date()} 
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Select booking date"
                  className="w-full p-2 border rounded-lg"
                  dateFormat={"dd/MM/YYYY"}
                />
              )}
            />
            {errors.bookingDate && (
              <p className="text-red-500 text-sm">{errors.bookingDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Booking Type</label>
            <select
              {...register("bookingType", { required: "Booking type is required" })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Booking Type</option>
              <option value="Full Day">Full Day</option>
              <option value="Half Day">Half Day</option>
              <option value="Custom">Custom</option>
            </select>
            {errors.bookingType && (
              <p className="text-red-500 text-sm">{errors.bookingType.message}</p>
            )}
          </div>

          {bookingType === "Half Day" && (
            <div>
              <label className="block text-sm font-medium">Booking Slot</label>
              <select
                {...register("bookingSlot", { required: "Booking slot is required" })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Slot</option>
                <option value="First Half">First Half</option>
                <option value="Second Half">Second Half</option>
              </select>
              {errors.bookingSlot && (
                <p className="text-red-500 text-sm">{errors.bookingSlot.message}</p>
              )}
            </div>
          )}

          {bookingType === "Custom" && (
            <div>
              <label className="block text-sm font-medium">Booking Time</label>
              <Controller
                control={control}
                name="bookingTime"
                render={({ field }) => (
                  <DatePicker
                    selected={bookingTime}
                    onChange={(date) => {
                      setBookingTime(date);
                      field.onChange(date);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={120}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="w-full p-2 border rounded-lg"
                  />
                )}
              />
              {errors.bookingTime && (
                <p className="text-red-500 text-sm">{errors.bookingTime.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
