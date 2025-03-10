import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export default function QuizzesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Your quizzes</h1>
      <p className="text-gray-500 mb-6">Train your knowledge.</p>

      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-xs">
          <select 
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4AA4DE] focus:border-transparent"
          >
            <option>Lesson 1: ا</option>
            <option>Lesson 2: ب</option>
            <option>Lesson 3: ت</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-3 mb-8">
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
            <div className="text-gray-500 mb-2">Quiz</div>
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

        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold inline-flex items-center">
            Word patterns 
            <span className="ml-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <InfoIcon size={14} />
            </span>
          </h2>
        </div>

        <div className="text-center mb-8">
          <p className="max-w-2xl mx-auto">
            You are training the most frequent word patterns in the Quran. These are not real words, the just sound similar to real occuring frequently.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild className="bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-8">
            <Link href="/quizzes/1">
              Go!
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 