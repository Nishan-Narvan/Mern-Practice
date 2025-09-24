import { Brain } from "../icons/Brain"
import { TwitterIcon } from "../icons/TwiterIcon"
import { Yt } from "../icons/Yt"
import { SidebarItem} from "./SidebarItem"

export function Sidebar(){

    return <>
<div className="h-screen bg-violet-300 border-r-violet-300 w-44 fixed left-0 top-0">
    <div className="pt-4 text-2xl flex  gap-2  p-2 justify-center items-center ">
        <Brain/>
        Brainly
        
    </div>
     
      <div className="pt-4 ml-4 ">
          <SidebarItem   text="Twitter" icon={<TwitterIcon/>}/>
          <SidebarItem text="Youtube" icon={<Yt/>}/>
           
            
      </div>
    </div>
    </>
}