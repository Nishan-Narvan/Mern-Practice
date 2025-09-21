import { useState } from 'react'
import { Button } from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' p-4'>
  

  <div className="flex justify-end  gap-1">
     <Button variant="primary" text="Add Content " startIcon={<PlusIcon />} ></Button>
    <Button variant="secondary" text="Share Link  " startIcon={<ShareIcon />}></Button>

    </div>


    <div className='flex'>
     <Card title="Twitter card" link="https://twitter.com/atulit_gaur/status/1969615959838376445" type="twitter"></Card>
     <Card title="Yt card" link="https://youtu.be/H96-pabEnWs" type="youtube"></Card>
   

    </div>
   
       
    </div>
  )
}

export default App
