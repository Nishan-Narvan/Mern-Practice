import { useState } from 'react'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     <Button variant="primary" text="Add Content " startIcon={<PlusIcon />} ></Button>
    <Button variant="secondary" text="Share Link  " startIcon={<ShareIcon />}></Button>
   
       
    </>
  )
}

export default App
