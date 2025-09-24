import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";


enum ContentType{
  Youtube = "youtube",
  Twitter= "twitter",
  Notion= "Notion",
  Instagram= "Instagram",


}

export function CreateContentModal({open,onClose}){


   const titleRef = useRef<HTMLInputElement>(null);
   const linkRef = useRef<HTMLInputElement>(null);
   const descRef = useRef<HTMLInputElement>(null);
   const [type,setType] =useState(ContentType.Youtube);


  async function addcontent(){
    try{

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const desc = descRef.current?.value;


    const response=await axios.post(`${BACKEND_URL}/api/v1/content`,{
      title,
      link,
      desc,
      type
    },{
      headers:{
        "Authorization" : localStorage.getItem("token")
      }
    })

    console.log(response.data.message); // success message
     alert(response?.data?.message )


}catch(err:any){
   alert(err.response?.data?.message || "Add Content failed, try again.");
}
  }

    return <> {open && <div onClick={onClose} className="w-screen h-screen bg-black fixed top-0 left-0 opacity-88 flex justify-center">
      <div onClick={(e) => e.stopPropagation()}
 className="flex flex-col justify-center items-center " >
        
    <span className="bg-white opacity-100 p-2 rounded justify-items-center">

        <div onClick={onClose} className="flex justify-end cursor-pointer">
            <CrossIcon/>
        </div>
        <div className="flex flex-col p-3 gap-3 ">
           <Input  className="w-80 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition" ref={titleRef} placeholder="title"/>
             <Input   className="w-80 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition" ref={linkRef} placeholder="link"/>
             <Input   className="w-80 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition" ref={descRef} placeholder="desc"/>
        </div >
       
       <div className="m-7 w-12 flex justify-center bg-gray-200 border p-1 border-gray-900 rounded-lg ">
        <h1 >Type</h1></div> 
        <div className="flex m-3 ">

          <Button text="Youtube" variant={type=== ContentType.Youtube?"primary":"secondary"} onClick={()=>setType(ContentType.Youtube)}/>
          <Button text="Twitter" variant={type=== ContentType.Twitter?"primary":"secondary"} onClick={()=>setType(ContentType.Twitter)}/>
            <Button text="Notion" variant={type=== ContentType.Notion?"primary":"secondary"} onClick={()=>setType(ContentType.Notion)}/>
        </div >
        
  
        <div className="flex m-3 ">
                
              <Button text="Instagram" variant={type=== ContentType.Instagram?"primary":"secondary"} onClick={()=>setType(ContentType.Instagram)}/>
        </div>
        <div className="flex justify-center items-center">
            <Button onClick={addcontent} text="Submit" variant="primary"></Button>
        </div>
    </span>

     
      </div>
    </div>}
    </>

}


