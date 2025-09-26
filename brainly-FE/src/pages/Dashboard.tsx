import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

interface Tag {
  _id: string
  name: string
}

interface Content {
  _id: string
  title: string
  link: string
  desc?: string
  contenttype: "twitter" | "youtube" | "notion" | "other"
  tags?: Tag[]
}

function Dashboard() {
  const [content, setContent] = useState<Content[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [share, setShare] = useState(false)

  // default to "all" so all content shows at start
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Backend error:", text);
          return;
        }
        const text = await res.text();
        console.log("Raw response:", text);

        const data = JSON.parse(text);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to fetch content", err);
      }
    }

    const interval = setInterval(fetchContent, 2000);
    return () => clearInterval(interval);
  }, [])

  async function giveLink() {
    try {
      const newShareState = !share;
      setShare(newShareState);

      const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: newShareState
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (newShareState) {
        if (res.data.link) {
          await navigator.clipboard.writeText(res.data.link);
          alert(`Share link enabled! Link copied to clipboard: ${res.data.link}`);
        } else {
          alert("Share link enabled, but no link received from server");
        }
      } else {
        alert("Share link disabled");
      }
    } catch (err: any) {
      console.error("Error in giveLink:", err);
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Something went wrong while updating the share link.");
      }
    }
  }

  return (
    <div className='bg-gradient-to-br from-slate-200 via-violet-100 to-purple-200 flex'>
      <Sidebar setFilterType={setFilterType} />

      <div className='p-4 ml-46 border-gray-2 flex-1 bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100 flex flex-col'>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-1 bg-gradient-to-r from-violet-500 via-violet-300 to-violet-100 p-3 rounded-2xl mb-4 -mt-1 shadow-lg shadow-violet-500/30 h-20">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            extrastyles="transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50 hover:bg-purple-400 hover:-translate-y-1 active:scale-95"
            text="Add Content"
            startIcon={<PlusIcon />}
            loading={false}
          />

          <Button
            onClick={() => giveLink()}
            variant="primary"
            text={share ? "Disable Share" : "Share Link"}
            startIcon={<ShareIcon />}
            extrastyles="transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-purple-500/50 hover:bg-purple-400 hover:-translate-y-1 active:scale-95"
            loading={false}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-1">
          <div className='flex flex-wrap justify-start items-start gap-4 rounded-3xl p-9 
            bg-gradient-to-br from-violet-100 via-violet-300 to-violet-500  
            shadow-inner shadow-violet-600/20 h-auto'>
            
            {content
              .filter(item => filterType === "all" || item.contenttype === filterType)
              .map((item) => (
                <div
                  key={item._id}
                  className='bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 p-0 rounded-2xl'
                >
                  <Card
                    title={item.title}
                    link={item.link}
                    type={item.contenttype || "other"}
                    styles="max-w-xs"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
