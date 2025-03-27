import React from "react";
import { useForm } from "react-hook-form"
import useApi from "../hook/useApi";

 const SignUpForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const {apiCall,error} = useApi();
    const onSubmit = async (data) => {
      console.log("Sign Up Data------>", data);
      try {
        const response = await apiCall("POST", `/auth/signup`, data);
        console.log('Response------>', response);
    
        if (response.success) { 
          alert("Sign Up Successful! We've sent an email for verification.");
        } else {
          alert(response.message || "Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error("Unexpected Error:", err);
        alert("Unexpected error occurred. Please try again.");
      }
    };
    
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className="w-full p-2 border rounded-lg"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Second Name"
              className="w-full p-2 border rounded-lg"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            placeholder="xyz@example.com"
            className="w-full p-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
  
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="XXXXXXXX"
            className="w-full p-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
  
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    );
  };

  export default SignUpForm;