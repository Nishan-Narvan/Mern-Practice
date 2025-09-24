
import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



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


        return<div className="h-screen w-screen bg-violet-300 flex justify-center items-center">
    
            <div className= "flex flex-col gap-5  p-5 bg-white rounded-2xl border-none  min-w-43 min-h-54 ">
                <Input ref={usernameRef} placeholder="Username"/>
                <Input ref={passwordRef} placeholder="Password"/>
    
                  <div className="flex justify-center ">
                <Button onClick={signin} loading={loading} variant="primary" text="SignIn" fullWidth={true} />
            </div>
            </div>
        
        </div>
    
}