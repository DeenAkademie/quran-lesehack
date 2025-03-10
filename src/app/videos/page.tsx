import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function VideosPage() {
  const videos = [
    {
      id: 1,
      title: "Introduction to Arabic Alphabet",
      thumbnail: "/img/lesson-video.jpg",
      duration: "9:42",
      watched: true
    },
    {
      id: 2,
      title: "Learning Alif",
      thumbnail: "/img/lesson-video.jpg",
      duration: "7:15",
      watched: false
    },
    {
      id: 3,
      title: "Learning Ba",
      thumbnail: "/img/lesson-video.jpg",
      duration: "8:30",
      watched: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Videos</h1>
      <p className="text-gray-500 mb-6">Watch educational videos about Quran reading.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col">
            <div className="relative rounded-lg overflow-hidden mb-3 bg-black">
              <Image 
                src={video.thumbnail} 
                alt={video.title} 
                width={640} 
                height={360} 
                className="w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/20 rounded-full p-3">
                  <Play className="h-6 w-6 text-white" fill="white" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              {video.watched && (
                <div className="absolute top-2 right-2 bg-[#4AA4DE] text-white text-xs px-2 py-1 rounded">
                  Watched
                </div>
              )}
            </div>
            <h2 className="text-lg font-medium mb-3">{video.title}</h2>
            <Button className="bg-[#4AA4DE] hover:bg-[#3993CD] text-white mt-auto">
              {video.watched ? "Watch again" : "Watch now"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 