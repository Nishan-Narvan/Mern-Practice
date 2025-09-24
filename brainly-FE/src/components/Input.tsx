export function  Input({ref, placeholder,className}: {ref: any; placeholder:string,className?: string}){
    return(
        <>
        <input placeholder={placeholder} type="text" className={className +" px-4 py-2"}  ref={ref}/>
        </>
    )
}

