import type { ReactElement } from "react";

export function SidebarItem({text, icon}: {text: string; icon: ReactElement}){
    return<>
    <div className="flex  items-center text-gray-700 cursor-pointer hover:bg-slate-300 duration-200 pr-2 mr-3 rounded-3xl max-w-72">
        <div className="p-2">
        {icon}
        </div>
        <div className="p-2">
        {text}
        </div>        
    </div>
    </>
}