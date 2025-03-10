import Link from "next/link";
import { Button } from "@/components/ui/button";

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const quizId = parseInt(params.id);
  
  // This would come from the database in a real implementation
  const quizzes = [
    { 
      id: 1, 
      title: "Word patterns", 
      description: "You are training the most frequent word patterns in the Quran. These are not real words, the just sound similar to real occuring frequently.",
      lessonId: 1,
      totalQuizzes: 3,
      successfulAttempts: 0
    },
    { 
      id: 2, 
      title: "Letter Recognition", 
      description: "Identify the correct Arabic letter from multiple options.",
      lessonId: 1,
      totalQuizzes: 3,
      successfulAttempts: 0
    },
    { 
      id: 3, 
      title: "Writing Practice", 
      description: "Practice writing the Arabic letter in different positions.",
      lessonId: 1,
      totalQuizzes: 3,
      successfulAttempts: 0
    }
  ];
  
  const quiz = quizzes.find(e => e.id === quizId) || quizzes[0];
  
  // Mock data for a word pattern quiz
  const wordPatterns = [
    { id: 1, arabic: "بَعْلَ", transliteration: "ba'la" },
    { id: 2, arabic: "فَعَلَ", transliteration: "fa'ala" },
    { id: 3, arabic: "كَتَبَ", transliteration: "kataba" },
    { id: 4, arabic: "ذَهَبَ", transliteration: "dhahaba" }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Link href="/quizzes" className="text-[#4AA4DE] hover:underline mr-2">
          &larr; Back to quizzes
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-1">{quiz.title}</h1>
      <p className="text-gray-500 mb-6">Lesson {quiz.lessonId}</p>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-3 mb-8">
          <div className="text-center">
            <div className="text-gray-500 mb-2">Lesson</div>
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 p-2 rounded-md">
                <span className="text-blue-600 font-bold">{quiz.lessonId}</span>
                <span className="text-gray-400 text-xs">/28</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-2">Quiz</div>
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 p-2 rounded-md">
                <span className="text-blue-600 font-bold">{quiz.id}</span>
                <span className="text-gray-400 text-xs">/{quiz.totalQuizzes}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 mb-2">Successful</div>
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 p-2 rounded-md">
                <span className="text-blue-600 font-bold">{quiz.successfulAttempts}</span>
                <span className="text-gray-400 text-xs">/{quiz.totalQuizzes}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="max-w-2xl mx-auto">
            {quiz.description}
          </p>
        </div>
        
        {quiz.id === 1 && (
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wordPatterns.map((pattern) => (
                <div key={pattern.id} className="border border-gray-200 rounded-lg p-4 text-center hover:border-[#4AA4DE] cursor-pointer transition-colors">
                  <div className="text-2xl mb-2 font-arabic">{pattern.arabic}</div>
                  <div className="text-sm text-gray-500">{pattern.transliteration}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button className="bg-[#4AA4DE] hover:bg-[#3993CD] text-white px-8">
            Submit
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between">
        {quizId > 1 && (
          <Button asChild variant="outline" className="flex items-center">
            <Link href={`/quizzes/${quizId - 1}`}>
              &larr; Previous Quiz
            </Link>
          </Button>
        )}
        <div className="flex-1"></div>
        {quizId < quizzes.length && (
          <Button asChild className="bg-[#4AA4DE] hover:bg-[#3993CD]">
            <Link href={`/quizzes/${quizId + 1}`}>
              Next Quiz &rarr;
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
} 