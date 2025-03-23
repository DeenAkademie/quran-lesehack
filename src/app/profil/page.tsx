'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PasswordChangeForm } from '@/components/password-change-form';
import { useEffect, useState } from 'react';
import {
  getUserProfileData,
  getUserLessonState,
  getUserProgress,
} from '@/api/api';
import { Skeleton } from '@/components/ui/skeleton';
import {
  UserLessonState,
  UserProfileData,
  UserProgress,
} from '@/api/types/api_types';

// Define the achievement and activity types
interface Achievement {
  id: number;
  title: string;
  date: string;
}

interface Activity {
  id: number;
  action: string;
  date: string;
}

// Extended user profile to include additional properties
interface ExtendedUserProfile extends UserProfileData {
  avatar?: string;
  email?: string;
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<ExtendedUserProfile | null>(
    null
  );
  const [lessonState, setLessonState] = useState<UserLessonState | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch all user data in parallel
        const [profileData, lessonStateData, progressData] = await Promise.all([
          getUserProfileData(),
          getUserLessonState(),
          getUserProgress(),
        ]);

        console.log('Profile Data:', profileData);
        console.log('Lesson State:', lessonStateData);
        console.log('Progress Data:', progressData);

        setUserProfile(profileData as ExtendedUserProfile);
        setLessonState(lessonStateData);
        setUserProgress(progressData);

        // Calculate derived values
        const completedLessons = progressData?.lessonNo
          ? progressData.lessonNo - 1
          : 0;
        const hasanat = lessonStateData?.hasanat_counter || 0;

        // Generate achievements based on completed lessons and hasanat
        const newAchievements: Achievement[] = [];

        if (completedLessons >= 1) {
          newAchievements.push({
            id: 1,
            title: 'Erste Lektion abgeschlossen',
            date: new Date().toLocaleDateString('de-DE'),
          });
        }

        if (completedLessons >= 7) {
          newAchievements.push({
            id: 2,
            title: 'Eine Woche am Stück gelernt',
            date: new Date().toLocaleDateString('de-DE'),
          });
        }

        if (hasanat >= 1000) {
          newAchievements.push({
            id: 3,
            title: '1000 Hasanat erreicht',
            date: new Date().toLocaleDateString('de-DE'),
          });
        }

        setAchievements(newAchievements);

        // Generate recent activity based on the user's progress
        const newRecentActivity: Activity[] = [];

        const exercisesPassed = lessonStateData?.exercise_passed_count || 0;

        if (completedLessons > 0) {
          newRecentActivity.push({
            id: 1,
            action: `Lektion ${completedLessons} abgeschlossen`,
            date: 'Kürzlich',
          });
        }

        if (exercisesPassed > 0) {
          newRecentActivity.push({
            id: 2,
            action: `${exercisesPassed} Übungen abgeschlossen`,
            date: 'Kürzlich',
          });
        }

        if (hasanat > 0) {
          newRecentActivity.push({
            id: 3,
            action: `${hasanat} Hasanat gesammelt`,
            date: 'Gesamt',
          });
        }

        setRecentActivity(newRecentActivity);
      } catch (e) {
        console.error('Error fetching user data:', e);
        setError('Fehler beim Laden der Profildaten');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Calculate derived values from the fetched data
  const totalProgress =
    userProgress?.lessonNo && lessonState?.lesson_no
      ? Math.round((userProgress.lessonNo / 28) * 100) // Assuming 28 is the total number of lessons
      : 0;

  const completedLessons = userProgress?.lessonNo
    ? userProgress.lessonNo - 1
    : 0;
  const totalLessons = 28; // This could come from the backend if available

  const hasanat = lessonState?.hasanat_counter || 0;

  if (isLoading) {
    return (
      <div className='container mx-auto py-8'>
        <h1 className='text-4xl font-bold mb-8'>Mein Profil</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-1'>
            <Card>
              <CardHeader className='flex flex-col items-center'>
                <Skeleton className='h-24 w-24 rounded-full mb-4' />
                <Skeleton className='h-6 w-32 mb-2' />
                <Skeleton className='h-4 w-48 mb-1' />
                <Skeleton className='h-4 w-24 mt-1' />
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between mb-1'>
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-4 w-8' />
                    </div>
                    <Skeleton className='h-2 w-full' />
                  </div>
                  <div className='grid grid-cols-2 gap-4 pt-4'>
                    <Skeleton className='h-24 w-full' />
                    <Skeleton className='h-24 w-full' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='lg:col-span-2'>
            <Skeleton className='h-12 w-full mb-6' />
            <Skeleton className='h-64 w-full' />
          </div>
        </div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className='container mx-auto py-8'>
        <h1 className='text-4xl font-bold mb-8'>Mein Profil</h1>
        <Card>
          <CardContent className='py-8'>
            <div className='text-center text-red-500'>
              {error || 'Profildaten konnten nicht geladen werden'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Mein Profil</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader className='flex flex-col items-center'>
              <Avatar className='h-24 w-24 mb-4'>
                <AvatarImage
                  src={
                    userProfile.avatar_url || userProfile.avatar || undefined
                  }
                  alt={userProfile.user_name}
                />
                <AvatarFallback>
                  {userProfile.first_name && userProfile.last_name
                    ? `${userProfile.first_name[0]}${userProfile.last_name[0]}`
                    : userProfile.user_name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {userProfile.first_name} {userProfile.last_name}
              </CardTitle>
              <CardDescription>
                {userProfile.email || userProfile.user_name}
              </CardDescription>
              <p className='text-sm text-muted-foreground mt-1'>
                Mitglied seit{' '}
                {userProfile.member_since ||
                  new Date().toLocaleDateString('de-DE', {
                    month: 'long',
                    year: 'numeric',
                  })}
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
                      {totalProgress}%
                    </span>
                  </div>
                  <Progress value={totalProgress} className='h-2' />
                </div>

                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='text-center p-4 bg-muted rounded-lg'>
                    <p className='text-3xl font-bold'>{completedLessons}</p>
                    <p className='text-sm text-muted-foreground'>
                      von {totalLessons} Lektionen
                    </p>
                  </div>
                  <div className='text-center p-4 bg-muted rounded-lg'>
                    <p className='text-3xl font-bold'>{hasanat}</p>
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
                  {recentActivity.length > 0 ? (
                    <ul className='space-y-4'>
                      {recentActivity.map((activity) => (
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
                  ) : (
                    <p className='text-muted-foreground'>
                      Noch keine Aktivitäten vorhanden.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='achievements' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Meine Erfolge</CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.length > 0 ? (
                    <ul className='space-y-4'>
                      {achievements.map((achievement) => (
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
                  ) : (
                    <p className='text-muted-foreground'>
                      Noch keine Erfolge erreicht.
                    </p>
                  )}
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
