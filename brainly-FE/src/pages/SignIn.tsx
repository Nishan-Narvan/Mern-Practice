
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "../icons/Brain";



export function SignIn() {
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();



  async function signin() {
  try {
    setLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });

    console.log(response.data.message); // success message
     alert(response?.data?.message +"==> We going to Dashboard" )

     const token = response.data.token;
     localStorage.setItem("token", token)

     navigate("/dashboard")

  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("Signin failed ❌", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signin failed, try again.");
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
                
                <Input ref={usernameRef} placeholder="Username " className=""/>
                <Input ref={passwordRef} placeholder="Password" className=""/>
    
                <div className="flex justify-center ">
                    <Button onClick={signin} loading={loading} variant="primary" text="SignIn" fullWidth={true} startIcon={<Brain />} />
                </div>
            </div>
        
        </div>
    
}