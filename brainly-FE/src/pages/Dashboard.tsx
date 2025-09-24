import { useState } from 'react'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'




function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='bg-slate-300'>
      <Sidebar />

      <div className='p-4 ml-44 border-gray-2 min-h-screen bg-slate-100'>
  
  <CreateContentModal open={modalOpen} onClose={()=>setModalOpen(false)}></CreateContentModal>
  <div className="flex justify-end  gap-1">
    <>
     <Button onClick={()=>setModalOpen(true)} variant="primary" text="Add Content " startIcon={<PlusIcon />} ></Button>
     </>
    <Button variant="secondary" text="Share Link  " startIcon={<ShareIcon />}></Button>

    </div>


    <div className='flex '>
     <Card title="Twitter card" link="https://twitter.com/atulit_gaur/status/1969615959838376445" type="twitter"></Card>
     <Card title="Yt card" link="https://youtu.be/H96-pabEnWs" type="youtube"></Card>
   

    </div>
   
       
    </div>
    </div>
  )
}

export default Dashboard
