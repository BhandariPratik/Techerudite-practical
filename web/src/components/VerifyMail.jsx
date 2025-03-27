import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useApi from "../hook/useApi";
import useAuthStore from "../store/authStore";

const VerifyEmail = () => {
  const { apiCall, loading, error } = useApi();
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {setIsverified} = useAuthStore()

  useEffect(() => {
    verifyEmail();
  }, []);


  const verifyEmail = async () => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }
    const response = await apiCall("GET", `/auth/verify/${token}`);
    console.log("response------>",response)

    if (response.success) {
      setMessage("Email verified successfully, wait you will redirect to Login Page");
      setIsverified(true)
      setTimeout(()=>{
        navigate("/")
      },2000) 
    } else {
      setMessage(response.message || "Email verification failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {loading ? (
          <p>Verifying...</p>
        ) : (
          <p className={error ? "text-red-500" : "text-green-500"}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
