let username: string; // ✅ Allowed
username = "Alice";   // ✅ Works
username = 42;        // ❌ Error: Type 'number' is not assignable to type 'string'.


type User ={
    id: number;
    name:string;
    isAdmin?: boolean;
}

function printUser(user: User){
    if(user.isAdmin !== undefined){
        console.log(` Admin is ${user.isAdmin}`)
    }

}


title?: string
title: string | undefined

name: string= "haha"



:string[]



e:React.ChangeEvent<HTMLInputElement>
e:React.MouseEvent<HTMLButtonElement>

const [count,setCount ] = useState< string[] | type User | null > ()



