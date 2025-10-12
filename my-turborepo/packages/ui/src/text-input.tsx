

interface PropType {

    placeholder: string;
    size: "big" | "small";
    onChange: (e: any)=>void;
    
}

 
export function TextInput ({placeholder, size, onChange}: PropType) {
  return (
    <>
    <input placeholder={placeholder} onChange={onChange} style={{ 

        padding: size === "big"?20: 10,
        margin: size === "big"? 20 : 10,
        borderColor: "black",
        borderWidth: 1,
        
    }}></input>
    </>
  )
}
