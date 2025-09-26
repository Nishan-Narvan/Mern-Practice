import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { Link } from "../icons/Link";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "notion" | "other";
  styles: string;
}

export function Card({ title, link, type }: CardProps) {

  const finalLink = (link: string) => {
    return type === "twitter" ? link.replace("x.com", "twitter.com") : link;
  };

  const getYoutubeEmbed = (url: string) => {
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

   
    useEffect(() => {
    // Only for Twitter embeds
    if (type === "twitter") {
      // @ts-ignore
      if (window.twttr) {
        // @ts-ignore
        window.twttr.widgets.load();
      }
    }
  }, [link, type]);


  return (
    <div>
      <div className="p-8 m-5 bg-gradient-to-br from-white via-violet-100 to-violet-200 rounded-xl border border-violet-300 max-w-72 min-h-72 shadow-lg shadow-violet-300/30 hover:shadow-xl hover:shadow-violet-400/40 transition-all duration-300 hover:scale-105">
        <div className="flex justify-between items-center text-md">
          <div className="flex text-black gap-2 ml-2 font-mono text-xl">
            
            {title}
          </div>
          <div className="flex">
            <div className="text-gray-500 pr-2">
              <a href={link} target="_blank">
                <Link />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-5">
          {type === "youtube" && (
            <iframe
              className="w-full h-50"
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

          {type === "notion" && (
            <iframe
              className="w-full h-96 border rounded-md"
              src={link}
              title="Notion Content"
              frameBorder="0"
              allow="clipboard-write; encrypted-media"
            />
          )}

          {type === "other" && (
            <div className="p-4 border rounded-md bg-gray-100 text-gray-800">
              <a href={link} target="_blank" className="underline text-blue-600">
                {link}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
