import { ShareIcon } from "../icons/ShareIcon";



interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({title, link,type}: CardProps) {


  const finalLink=(link:string)=>{
    
    const linkis= type=== "twitter" ? link.replace("x.com", "twitter.com") : link
  return linkis}



  const getYoutubeEmbed = (url: string) => {
  // Normal YouTube URL
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  // Shortened youtu.be URL
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // fallback
  return url;
};

    ;
  return (
    <div>
      <div className="p-8 m-5 bg-violet-300 rounded-md border-2-blue-500 max-w-72 min-h-72">
      <div className="flex  justify-between items-center text-md">
        <div className=" flex text-gray-500 gap-2">
          <ShareIcon/>
          {title}
         
        </div>
        <div className="flex ">
          <div className="text-gray-500 pr-2">
            <a href={link} target="_blank">
          <ShareIcon/>
          </a>
          </div>
          <div className="text-gray-500 ">
          <ShareIcon/>
          </div>
        </div>
      </div>

     <div className="pt-5">

{type === "youtube" && (
  <iframe
    className="w-full"
    src={getYoutubeEmbed(link)}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
)}



     
     {type === "twitter" && (
        <div>
          <blockquote className="twitter-tweet">
            <a href={finalLink(link)}></a>
          </blockquote>    
        </div>
           )}
           </div>

      </div>
    </div>
  )
}

