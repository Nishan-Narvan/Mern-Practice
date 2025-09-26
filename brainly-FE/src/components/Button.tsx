import type { ReactElement } from "react";

interface ButtonProps {

    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
    onClick?: ()=>void;
    fullWidth?:boolean;
    loading: boolean;
    extrastyles?:string;
}


const variantClasses= {
    "primary": "bg-purple-300 text-white p-4",
    "secondary": "bg-gray-200 text-purple-300 p-4"
}


const defaultStyles= "px-4 ml-3 py-2 rounded-md font-light flex items-center"

export function Button({variant, text, startIcon, onClick, loading,fullWidth,extrastyles}: ButtonProps){

    return <button onClick={onClick} className={variantClasses[variant] +" " + defaultStyles + extrastyles+`${fullWidth ? " w-full flex items-center justify-center" : ""}` +`${ loading ? " opacity-55":""}`}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
        </button>


}

