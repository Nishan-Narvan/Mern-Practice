import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

type Tag = { _id: string; name: string };

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");


  const [contentType, setContentType] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token");

  // Fetch user tags
  useEffect(() => {
    if (!open || !token) return;

    async function fetchTags() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/tags`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTags(res.data.tags);
      } catch (err) {
        console.error(err);
        alert("Failed to load tags");
      }
    }

    fetchTags();
  }, [open, token]);


  async function deleteTag(id: string){

    if(!token) return alert ("User token not found, not authourized")

      try{
            await axios.delete(`${BACKEND_URL}/api/v1/tags/${id}`,{
            
            headers: { Authorization: `Bearer ${token}` },
            })
             
            setTags((prev)=> prev.filter((t)=>t._id!== id))

            setSelectedTags((prev)=> prev.filter((id)=> id!==id))



      }catch(err:any){
        alert(err.response?.data?.message || "Failed to delete tag");
      }
  } 

  // Add new tag
  async function addNewTag() {
    if (!newTag.trim() || !token) return;
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/tags`,
        { name: newTag },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTags([...tags, res.data.tag]);
      setSelectedTags([...selectedTags, res.data.tag._id]);
      setNewTag("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add tag");
    }
  }

  // Submit content
  async function addContent() {
    if (!token) return alert("User not authorized");

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const desc = descRef.current?.value;

    if (!title || !link) {
      return alert("Title and link are required");
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, desc, contentType,tags: selectedTags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Content added");
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add content");
    }
  }

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="w-screen h-screen bg-black/80 fixed top-0 left-0 flex justify-center items-center "
    >
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center max-w-2xl w-full mx-4">
        <span className="bg-gradient-to-br from-violet-100 via-violet-300 to-violet-400 rounded-lg w-full p-6 items-center">
          <div onClick={onClose} className="flex justify-end cursor-pointer mb-2">
            <CrossIcon />
          </div>

        <div className="flex flex-col gap-3 ">
  <Input
   className="w-full border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-violet-300 
               focus:border-[#4544D9] transition"
    ref={titleRef}
    placeholder="Title"
  />
  <Input
    className="w-full border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-violet-300 
               focus:border-[#4544D9] transition"
    ref={linkRef}
    placeholder="Link"
  />
  <Input
    className="w-full border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-violet-300 
               focus:border-[#4544D9] transition"
    ref={descRef}
    placeholder="Description"
  />

  <select
    value={contentType}
    onChange={(e) => setContentType(e.target.value)}
     className="w-full border border-gray-300 rounded-lg px-3 py-2 
               focus:outline-none focus:ring-2 focus:ring-violet-300 
               focus:border-[#4544D9] transition"
  >
    <option value="" disabled>
      Select your content type
    </option>
    <option value="youtube">YouTube</option>
    <option value="twitter">Twitter</option>
    <option value="notion">Notion</option>
    <option value="other">Other</option>
  </select>
</div>

          {/* Tag Selection */}
     

          {/* Add new tag */}
            <div className="flex gap-2 m-2 w-full ">
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-[#4544D9] transition"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
            />
            <button
              onClick={addNewTag}
              className="bg-[#4544D9] text-white px-3 py-2 rounded-lg transition hover:bg-violet-700"
            >
              Add
            </button>
            </div>

                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {tags.map((tag) => (
                    <div key={tag._id} className="flex items-center gap-1 mb-1">
                      <button
                        className={`px-3 py-1 rounded-lg border-2 ${
                          selectedTags.includes(tag._id)
                            ? "bg-[#4544D9] text-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.includes(tag._id)
                              ? prev.filter((id) => id !== tag._id)
                              : [...prev, tag._id]
                          )
                        }
                      >
                        {tag.name}
                      </button>
                      <div
                        onClick={() => deleteTag(tag._id)}
                        className="flex justify-center items-center cursor-pointer w-5 h-5 rounded-full border border-black bg-white hover:bg-gray-400 transition"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <CrossIcon styles="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>

          <div className="flex justify-center">
            <Button onClick={addContent} text="Submit" variant="primary" startIcon={<div></div>} loading={false} />
          </div>
        </span>
      </div>
    </div>
  );
}
