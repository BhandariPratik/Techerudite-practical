import React from "react";
import { useForm } from "react-hook-form"
import useApi from "../hook/useApi";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

 const SignInForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const {apiCall,error} = useApi()
    const navigate = useNavigate()
    const {setAuthtoken} = useAuthStore()

    const onSubmit = async(data) => {
      try {
        const response = await apiCall("POST", `/auth/signin`, data);
        console.log('Response------>', response);
    
        if (response.success) { 
          alert("Sign In Successful!");
          navigate('/booking')
          setAuthtoken(response?.data?.token)
          localStorage.setItem('authtoken',response?.data?.token)
        } else {
          alert(error);
        }
      } catch (err) {
        console.error("Unexpected Error:", err);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register("password", { required: "Password is required" })}
            placeholder="XXXXXXXXX"
            className="w-full p-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
  
        <button
          type="submit"
          className="cursor-pointer w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Sign In
        </button>
      </form>
    );
  };

  export default SignInForm;