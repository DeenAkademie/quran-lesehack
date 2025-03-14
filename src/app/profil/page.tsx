import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordChangeForm } from '@/components/password-change-form';

export default function ProfilePage() {
  // This would come from the database in the real implementation
  const user = {
    name: 'Ahmed Mustafa',
    email: 'ahmed@example.com',
    avatar: '/img/avatar.png',
    joinedDate: '01.01.2023',
    totalProgress: 42,
    completedLessons: 4,
    totalLessons: 28,
    completedExercises: 12,
    totalExercises: 84,
    hasanat: 1250,
    achievements: [
      { id: 1, title: 'Erste Lektion abgeschlossen', date: '02.01.2023' },
      { id: 2, title: 'Erste Woche am Stück gelernt', date: '07.01.2023' },
      { id: 3, title: '1000 Hasanat erreicht', date: '15.02.2023' },
    ],
    recentActivity: [
      { id: 1, action: 'Lektion 4 abgeschlossen', date: 'Gestern' },
      { id: 2, action: 'Quiz 3-2 bestanden', date: 'Vor 3 Tagen' },
      { id: 3, action: 'Übung 3-1 abgeschlossen', date: 'Vor 4 Tagen' },
    ],
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Mein Profil</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader className='flex flex-col items-center'>
              <Avatar className='h-24 w-24 mb-4'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <p className='text-sm text-muted-foreground mt-1'>
                Mitglied seit {user.joinedDate}
              </p>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <div className='flex justify-between mb-1'>
                    <span className='text-sm font-medium'>
                      Gesamtfortschritt
                    </span>
                    <span className='text-sm font-medium'>
                      {user.totalProgress}%
                    </span>
                  </div>
                  <Progress value={user.totalProgress} className='h-2' />
                </div>

                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='text-center p-4 bg-muted rounded-lg'>
                    <p className='text-3xl font-bold'>
                      {user.completedLessons}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      von {user.totalLessons} Lektionen
                    </p>
                  </div>
                  <div className='text-center p-4 bg-muted rounded-lg'>
                    <p className='text-3xl font-bold'>{user.hasanat}</p>
                    <p className='text-sm text-muted-foreground'>Hasanat</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-2'>
          <Tabs defaultValue='activity'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='activity'>Aktivitäten</TabsTrigger>
              <TabsTrigger value='achievements'>Erfolge</TabsTrigger>
              <TabsTrigger value='settings'>Einstellungen</TabsTrigger>
            </TabsList>

            <TabsContent value='activity' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Letzte Aktivitäten</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-4'>
                    {user.recentActivity.map((activity) => (
                      <li
                        key={activity.id}
                        className='flex justify-between items-center border-b pb-2 last:border-0'
                      >
                        <span>{activity.action}</span>
                        <span className='text-sm text-muted-foreground'>
                          {activity.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='achievements' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Meine Erfolge</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-4'>
                    {user.achievements.map((achievement) => (
                      <li
                        key={achievement.id}
                        className='flex justify-between items-center border-b pb-2 last:border-0'
                      >
                        <span>{achievement.title}</span>
                        <span className='text-sm text-muted-foreground'>
                          {achievement.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='settings' className='mt-6'>
              <div className='space-y-6'>
                <PasswordChangeForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 