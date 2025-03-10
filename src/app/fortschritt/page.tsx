import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function ProgressPage() {
  // This would come from the database in the real implementation
  const userProgress = {
    totalProgress: 42,
    totalHasanat: 1250,
    completedLessons: 4,
    totalLessons: 28,
    lessons: [
      { id: 1, title: "Alif", progress: 100, hasanat: 350 },
      { id: 2, title: "Ba", progress: 100, hasanat: 320 },
      { id: 3, title: "Ta", progress: 100, hasanat: 280 },
      { id: 4, title: "Tha", progress: 75, hasanat: 200 },
      { id: 5, title: "Jim", progress: 25, hasanat: 100 },
      { id: 6, title: "Ha", progress: 0, hasanat: 0 },
      { id: 7, title: "Kha", progress: 0, hasanat: 0 },
      { id: 8, title: "Dal", progress: 0, hasanat: 0 },
      // Additional lessons would be added here
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Mein Fortschritt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gesamtfortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{userProgress.totalProgress}%</div>
            <Progress value={userProgress.totalProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hasanat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProgress.totalHasanat}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Abgeschlossene Lektionen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userProgress.completedLessons} / {userProgress.totalLessons}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nächste Lektion</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-xl font-medium">Lektion {userProgress.completedLessons + 1}</div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/lektionen/${userProgress.completedLessons + 1}`}>Fortsetzen</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Lektionen im Detail</h2>

      <div className="space-y-6">
        {userProgress.lessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Lektion {lesson.id}: {lesson.title}</CardTitle>
                <div className="text-sm font-medium">{lesson.progress}%</div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <Progress value={lesson.progress} className="h-2 mb-4" />
              <div className="flex justify-between items-center">
                <CardDescription>Gesammelte Hasanat</CardDescription>
                <div className="text-sm font-medium">{lesson.hasanat}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button asChild variant={lesson.progress === 100 ? "outline" : "default"}>
                <Link href={`/lektionen/${lesson.id}`}>
                  {lesson.progress === 100 ? "Wiederholen" : lesson.progress > 0 ? "Fortsetzen" : "Starten"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 