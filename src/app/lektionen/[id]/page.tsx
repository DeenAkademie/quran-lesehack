import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

// This would come from the database in the real implementation
const lessons = {
  '1': {
    id: 1,
    title: 'Alif',
    description: 'Der erste Buchstabe des arabischen Alphabets',
    content:
      "Alif ist der erste Buchstabe des arabischen Alphabets. Er wird wie ein langer 'A' ausgesprochen.",
    exercises: [
      {
        id: '1-1',
        title: 'Alif erkennen',
        description:
          'Lerne, wie der Buchstabe Alif aussieht und wie er geschrieben wird.',
        type: 'recognition',
      },
      {
        id: '1-2',
        title: 'Alif aussprechen',
        description: 'Übe die korrekte Aussprache des Buchstaben Alif.',
        type: 'pronunciation',
      },
      {
        id: '1-3',
        title: 'Alif im Quran finden',
        description: 'Finde den Buchstaben Alif in verschiedenen Quran-Versen.',
        type: 'identification',
      },
    ],
  },
  // Additional lessons would be defined here
};

// Korrekte Typdefinition für Next.js 15 Page Component
type PageProps = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function LessonPage({ params }: PageProps) {
  const lessonId = params.id;
  const lesson = lessons[lessonId as keyof typeof lessons];

  if (!lesson) {
    return (
      <div className='container mx-auto py-8 text-center'>
        <h1 className='text-4xl font-bold mb-4'>Lektion nicht gefunden</h1>
        <p className='mb-8'>Die angeforderte Lektion existiert nicht.</p>
        <Button asChild>
          <Link href='/lektionen'>Zurück zur Lektionsübersicht</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8'>
        <Link
          href='/lektionen'
          className='text-primary hover:underline mb-4 inline-block'
        >
          &larr; Zurück zur Lektionsübersicht
        </Link>
        <h1 className='text-4xl font-bold mb-2'>
          Lektion {lesson.id}: {lesson.title}
        </h1>
        <p className='text-xl text-muted-foreground'>{lesson.description}</p>
      </div>

      <Tabs defaultValue='content' className='mb-8'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='content'>Lerninhalt</TabsTrigger>
          <TabsTrigger value='exercises'>Übungen</TabsTrigger>
        </TabsList>

        <TabsContent value='content' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Über den Buchstaben {lesson.title}</CardTitle>
              <CardDescription>
                Grundlegende Informationen und Aussprache
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{lesson.content}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='exercises' className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {lesson.exercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className='w-full'>
                    <Link
                      href={`/lektionen/${lesson.id}/uebungen/${exercise.id}`}
                    >
                      Übung starten
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className='flex justify-between'>
        {parseInt(lessonId) > 1 && (
          <Button asChild variant='outline'>
            <Link href={`/lektionen/${parseInt(lessonId) - 1}`}>
              &larr; Vorherige Lektion
            </Link>
          </Button>
        )}
        <div className='flex-1' />
        <Button asChild>
          <Link href={`/lektionen/${parseInt(lessonId) + 1}`}>
            Nächste Lektion &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
