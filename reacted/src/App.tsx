import { useState } from "react";
import "./App.css";

// Step 1: Define type outside the component
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // Step 2: Use the type in useState
  const [list, setList] = useState<Todo[]>([]);

  const [text, setText] = useState<string>("")

  const [edit, setEdit ]= useState<string>("");

  const [editId, setEditId] = useState<number | null>(null);



  const  handleTodo =():void=>{

const object: Todo ={
  id: Date.now(),
  text: text,
  completed: false
}





setList(prev=>[...prev, object])
  }



  function handlestatus(id:number):void{
    setList(prev=>prev.map((e)=>e.id=== id? {...e, completed: !e.completed}: e))
  }


  function handleDelete(id:number):void{

    setList(prev=>prev.filter((e)=>e.id !==id))
  }





  return <>
  <input onChange={(e)=>setText(e.target.value)}></input>
  <button onClick={handleTodo}>Click to add list</button>



  <div>{list.map((e)=> editId===e.id ? <>
    
    < input value={edit} onChange={(ev) => setEdit(ev.target.value)} />
    [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
    <button onClick={()=>{
      
      setList(prev =>
            prev.map(todo =>
              todo.id === e.id ? { ...todo, text: edit } : todo
            )
          );
          setEditId(null);
          setEdit("");
        }}
      >Save</button></>
        
        :
        
        <div key={e.id}>{e.text}<button onClick={()=>handlestatus(e.id)}>{e.completed? "Undo": "Complete"}</button><button onClick={()=>handleDelete(e.id)}>Delete</button><button onClick ={()=>{setEditId(e.id)
          setEdit(e.text);
        }}>Change Text</button></div>)}</div>
  </>
}

export default App

class counter extends Component{

 constructor(props){
  super(prop);
  this.state= {count:0}


 }


 increament=()=>{
  this.setState({ count: this.state.count + 1})
 }
 component Did Mount(){}

}