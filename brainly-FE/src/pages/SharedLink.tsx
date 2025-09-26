import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";

interface Tag {
  _id: string;
  name: string;
}

interface Content {
  _id: string;
  title: string;
  link: string;
  desc?: string;
  contenttype: "twitter" | "youtube" | "notion" | "other";
  tags?: Tag[];
}

function SharedLink() {
  const { shareId } = useParams<{ shareId: string }>();
  const [content, setContent] = useState<Content[]>([]);
  const [sharedBy, setSharedBy] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {

    if(!shareId) return;
    
    async function fetchShared() {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContent(res.data.content);
        setSharedBy(res.data.sharedbyuser);
        setError("");
      } catch (err: any) {
        console.error("Failed to load shared brain:", err);
        if (err.response?.status === 404) {
          setError("This shared link is no longer available or has been disabled.");
        } else {
          setError("Failed to load shared content. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchShared();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-violet-100 to-purple-200 flex items-center justify-center">
        <div className="text-xl text-violet-600">Loading shared content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-violet-100 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Oops!</div>
          <div className="text-gray-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-violet-100 to-purple-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 p-6 rounded-2xl mb-6 shadow-lg shadow-violet-500/30">
          <h2 className="text-xl font-bold text-white mb-2">
            Shared Brain Collection
          </h2>
          <p className="text-violet-100">
            Shared by: <span className="text-black font-semibold">{sharedBy}</span>
          </p>
        </div>

        {content.length === 0 ? (
          <div className="text-center text-gray-600 mt-12">
            <div className="text-xl mb-2">No content shared yet</div>
            <div>This brain collection is empty.</div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-violet-300 via-purple-400 to-violet-500 rounded-3xl p-6 shadow-inner shadow-violet-600/20">
            <div className="flex flex-wrap gap-4 justify-start items-start">
              {content.map((item) => (
                <div key={item._id} className='bg-gradient-to-r from-violet-400 via-purple-500 to-violet-400 p-0 rounded-2xl'>
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
        )}
      </div>
    </div>
  );
}

export default SharedLink;
