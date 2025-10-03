"use client"

import axios from "axios";
import { useEffect, useState } from "react"

export default function User(){
    const[loading,setLoading] = useState(true)
    const[data, setData] = useState();


    useEffect(()=>{
        axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details").then(response=>{

            setData(response.data)
            setLoading(false);
        } )
    })

    if(loading){
        return <>
        Loading...</>
    }
    return <div>
        {data?.name}
        {data?.email}
        <Users/>
        
    </div>
}



// Server components[Next files] cannot have sideeffects---Means in Nexts js
// To get useEffect and CLR in NExt js, have use client at top of the file



// SSR happens in next js--- it only returns the return div part{html with css elements}, rendering already happened in the next js server----then the result got sent on the client


// In cSR, a index root file on client got sent, that file loads the js , client renders the js , and preforms and execute js there and then make other requests to backend--this is waterlogging problem



// CSR----[[Like index file load hui---script tag---js load--execute--js---perform the action written in js[network requests]--get data---loads the index




// SSR-next js talks with backend , execute the js--loads all the html with elements---it got sent to the client[browser]---then it loads


// So, for data fetching in nexts---a very common and imp way is to fetch all the data all at once--using a aysnc function and then load that data



export async function Users(){

    const oresponse = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");

    const datao = oresponse.data;
    console.log("hiiiiii")

    return<div>

        Uusers page with next js way
        {datao.name}
        {datao.email}

    </div>
}