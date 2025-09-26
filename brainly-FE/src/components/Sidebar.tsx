import { Brain } from "../icons/Brain"
import { Notion } from "../icons/Notion"
import { Others } from "../icons/Others"
import { TwitterIcon } from "../icons/TwiterIcon"
import { Yt } from "../icons/Yt"
import { SidebarItem } from "./SidebarItem"

export function Sidebar({ setFilterType }: { setFilterType: (type: string) => void }) {
  return (
    <div
      className="h-screen w-48 fixed left-0 top-0 
      bg-gradient-to-br from-violet-100 via-violet-200 to-violet-500 
      p-6 shadow-inner shadow-violet-600/20"
    >
      {/* Logo/Header */}
      <div className="pt-4 mt-1 text-3xl flex gap-2 p-2 justify-center items-center relative z-10">
        <Brain />
        Brainly
      </div>

      {/* Sidebar Items */}
      <div
        className="pt-4 mt-8 flex flex-col justify-start items-center relative z-10
          bg-gradient-to-br from-purple-100 via-violet-400 to-violet-100 
          bg-opacity-80 border-4 border-purple-700 rounded-3xl w-36 shadow-lg"
      >
        <div className="w-full mb-2 ml-4">
          <button onClick={() => setFilterType("all")} className="w-full">
            <SidebarItem text="All" icon={<Others />} />
          </button>
        </div>
        <div className="w-full mb-2">
          <button onClick={() => setFilterType("twitter")} className="w-full">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          </button>
        </div>
        <div className="w-full mb-2">
          <button onClick={() => setFilterType("youtube")} className="w-full">
            <SidebarItem text="Youtube" icon={<Yt />} />
          </button>
        </div>
        <div className="w-full mb-2">
          <button onClick={() => setFilterType("notion")} className="w-full">
            <SidebarItem text="Notion" icon={<Notion />} />
          </button>
        </div>
        <div className="w-full mb-2 ml-2">
          <button onClick={() => setFilterType("other")} className="w-full">
            <SidebarItem text="Others" icon={<Others />} />
          </button>
        </div>
      </div>
    </div>
  )
}
