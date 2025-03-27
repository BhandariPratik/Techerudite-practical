import { useEffect, useState } from "react";
import SignInForm from "../utils/SignInForm";
import SignUpForm  from "../utils/SignUpForm";
import useAuthStore from "../store/authStore";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const {isVerified} = useAuthStore()

  useEffect(()=>{
    if(isVerified){
      setIsSignUp(false);
    }
  },[])
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {isSignUp ? <SignUpForm /> :  <SignInForm />}

        <div className="text-center mt-4">
          <p className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={()=> setIsSignUp((prev) => !prev)}
              className="ml-2 text-blue-500 hover:text-blue-700 transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
