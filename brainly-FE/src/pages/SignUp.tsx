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


    return<div className="h-screen w-screen bg-violet-300 flex justify-center items-center">

        <div className= "flex flex-col gap-5  p-5 bg-white rounded-2xl border-none  min-w-43 min-h-54 ">
            <Input ref={usernameRef} placeholder="Username"/>
            
            <Input ref={passwordRef} placeholder="Password"/>

              <div className="flex justify-center ">
            <Button onClick={signup} loading={loading} variant="primary" text="SignUp" fullWidth={true} />
        </div>
        </div>
    
    </div>
}