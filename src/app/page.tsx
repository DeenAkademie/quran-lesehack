import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Volume2, Maximize2, MoreVertical } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-6">An overview over the past week.</p>

        {/* Current Lesson Section */}
        <div className="bg-[#4AA4DE] text-white p-3 rounded-t-lg">
          Your current lesson - Lesson 1
        </div>
        <div className="bg-black mb-6 rounded-b-lg overflow-hidden">
          <div className="relative">
            <Image 
              src="/img/lesson-video.jpg" 
              alt="Lesson Video" 
              width={640} 
              height={360} 
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/20 rounded-full p-3">
                <Play className="h-6 w-6 text-white" fill="white" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 flex justify-between items-center">
              <div className="flex items-center">
                <span>0:00 / 9:42</span>
              </div>
              <div className="flex items-center gap-4">
                <Volume2 className="h-5 w-5" />
                <Maximize2 className="h-5 w-5" />
                <MoreVertical className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Last Exercise Section */}
        <div className="bg-[#4AA4DE] text-white p-3 rounded-t-lg">
          Your last exercise
        </div>
        <div className="border border-gray-200 rounded-b-lg mb-6">
          <div className="grid grid-cols-3 p-4">
            <div className="text-center">
              <div className="text-gray-500 mb-2">Lesson</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">1</span>
                  <span className="text-gray-400 text-xs">/28</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 mb-2">Exercise</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">1</span>
                  <span className="text-gray-400 text-xs">/3</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 mb-2">Successful</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">0</span>
                  <span className="text-gray-400 text-xs">/3</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-4 border-t">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
              Exercise!
            </Button>
          </div>
        </div>

        {/* Last Week Achievements */}
        <div className="bg-[#4AA4DE] text-white p-3 rounded-t-lg">
          Your last week achievements
        </div>
        <div className="border border-gray-200 rounded-b-lg">
          <div className="grid grid-cols-3 p-4">
            <div className="text-center">
              <div className="text-gray-500 mb-2">Exercises solved</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">0</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 mb-2">Hasanat achieved</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">0</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 mb-2">Progress reached</div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 p-2 rounded-md">
                  <span className="text-blue-600 font-bold">0.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      <div className="w-full md:w-64 p-6 flex flex-col items-center">
        <div className="mb-4">
          <Image 
            src="/img/avatar.jpg" 
            alt="Profile" 
            width={80} 
            height={80} 
            className="rounded-full border-4 border-gray-200"
          />
        </div>
        <h2 className="text-xl font-bold mb-6">Bilgekaaan xxx</h2>
        
        <div className="w-full border border-gray-200 rounded-lg p-4 mb-4">
          <div className="text-gray-500 mb-2">Current course</div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1 rounded">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-medium">Learn to read</span>
          </div>
        </div>
        
        <div className="w-full bg-gradient-to-br from-[#4AA4DE] to-[#63B4E8] rounded-lg p-4 text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Hasanat Counter</h3>
            <div className="bg-white/20 p-1 rounded">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image 
              src="/img/coin.png" 
              alt="Hasanat Coin" 
              width={24} 
              height={24} 
            />
            <span className="text-2xl font-bold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
