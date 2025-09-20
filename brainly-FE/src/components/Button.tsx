import type { ReactElement } from "react";

interface ButtonProps {

    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
}


const variantClasses= {
    "primary": "bg-purple-300 text-white p-4",
    "secondary": "bg-gray-200 text-purple-300 p-4"
}


const defaultStyles= "px-4 ml-3 py-2 rounded-md font-light flex items-center"

export function Button({variant, text, startIcon}: ButtonProps){

    return <button className={variantClasses[variant] +" " + defaultStyles }>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
        </button>


}

