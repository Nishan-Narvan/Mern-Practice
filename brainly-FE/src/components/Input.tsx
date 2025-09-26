export function  Input({ref, placeholder,className}: {ref: any; placeholder:string,className?: string}){
    return(
        <>
        <input 
            placeholder={placeholder} 
            type="text" 
            className={`${className} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 border border-black rounded-md transition-all duration-200`}  
            ref={ref}
        />
        </>
    )
}

