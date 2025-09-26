import { Button } from "../components/Button";
import { Input  } from "../components/Input";

import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function SignUp() {
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();



  async function signup() {
  try {
    setLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
 
    alert(response?.data?.message +"==>"+"Redirecting to signin" )
    console.log(response.data.message); // success message
    navigate("/signin")
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Signup failed ❌", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed, try again.");
    } else {
      console.error("Unexpected error ❌", err);
    }
  } finally {
    setLoading(false); // always reset loading
  }
}


    return<div className="h-screen w-screen bg-gradient-to-br from-violet-200 via-violet-300 to-violet-400 flex justify-center items-center">
    
            <div className="flex flex-col gap-5 p-8 bg-gradient-to-br from-white via-gray-50 to-white 
                           rounded-2xl min-w-96 min-h-64
                           shadow-2xl shadow-violet-500/30
                           border border-white/60
                           ">
                           
                {/* Subtle shine effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60"></div>
            <Input ref={usernameRef} placeholder="Username"/>
            
            <Input ref={passwordRef} placeholder="Password"/>

              <div className="flex justify-center ">
            <Button onClick={signup} loading={loading} variant="primary" text="SignUp" fullWidth={true} />
        </div>
        </div>
    
    </div>
}