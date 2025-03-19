import { ApiReadingExerciseAnswer } from '@/models/api_responses';
import { FunctionInvokeOptions } from '@supabase/supabase-js';
import { supabase } from './supabase_client';
import {
  SignUpDto,
  UserLessonState,
  GetReadingExercise,
  ExerciseResult,
  GetRankings,
  UserProfileData,
} from './types/api_types';

async function invokeFunc(
  functionName: string,
  body?: FunctionInvokeOptions['body']
) {
  // Don't attempt to make API calls during server-side rendering/building
  if (typeof window === 'undefined') {
    console.log('Skipping API call during SSR/SSG');
    return null;
  }

  try {
    const { session } = (await supabase.auth.getSession()).data;

    if (!session) {
      throw new Error('No active session found');
    }

    const { data, error } = await supabase.functions.invoke(functionName, {
      headers: {
        'refresh-token': session.refresh_token,
        Authorization: `Bearer ${session.access_token}`,
      },
      body,
    });

    // Safer error handling that won't break during build
    if (error) {
      console.error(`Error invoking function ${functionName}:`, error);

      // Check error types in a safer way
      if (
        error.name === 'FunctionsHttpError' &&
        error.context &&
        typeof error.context.json === 'function'
      ) {
        try {
          const errorMessage = await error.context.json();
          console.log('Function returned an error', errorMessage);
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
        }
      }

      throw error;
    }

    return data?.data || null;
  } catch (error) {
    console.error(`Error invoking function ${functionName}:`, error);
    throw error;
  }
}

/**
 * Registriert einen neuen Benutzer
 * @param dto Die Registrierungsdaten des Benutzers
 * @returns Die Antwort des Servers
 */
export async function signUp(dto: SignUpDto) {
  try {
    // Verwende die Supabase-Funktion für die Registrierung
    console.log('Registriere neuen Benutzer:', dto);

    // Bei der Registrierung gibt es noch keine Sitzung, daher direkter Aufruf
    // ohne Prüfung auf eine aktive Sitzung
    const { data, error } = await supabase.functions.invoke('auth_register', {
      body: dto,
    });

    if (error) {
      console.error('Function returned an error', error);

      // Versuche detaillierte Fehlerinformationen zu erhalten
      if (
        error.name === 'FunctionsHttpError' &&
        error.context &&
        typeof error.context.json === 'function'
      ) {
        try {
          const errorJson = await error.context.json();
          console.error('Detailed error:', errorJson);

          // Wenn die Fehlermeldung ein message-Feld enthält, verwende es
          if (errorJson && errorJson.message) {
            throw new Error(errorJson.message);
          }
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
        }
      }

      throw error;
    }

    return data?.data || null;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Meldet einen Benutzer an
 * @param email Die E-Mail-Adresse des Benutzers
 * @param password Das Passwort des Benutzers
 * @returns Die Sitzungsdaten des Benutzers
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      throw error;
    }

    // Token für Funktionsaufrufe setzen
    if (data?.session?.access_token) {
      supabase.functions.setAuth(data.session.access_token);
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Meldet einen Benutzer ab
 */
export async function signOut() {
  try {
    // Lokalen Speicher leeren
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }

    // Supabase-Abmeldung
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign out error:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getUserLessonState(): Promise<UserLessonState> {
  return await invokeFunc('user_lesson_state_get');
}

export async function getExercise(
  lessonNo: number,
  exerciseNo: number
): Promise<GetReadingExercise> {
  return await invokeFunc('exercise_get', {
    lesson_no: lessonNo,
    exercise_no: exerciseNo,
    lang_code: 'de',
  });
}

export async function submitExercise(
  lessonNo: number,
  exerciseNo: number,
  answerHashes: string[],
  answers: ApiReadingExerciseAnswer[]
): Promise<ExerciseResult> {
  return await invokeFunc('exercise_submit', {
    lesson_no: lessonNo,
    exercise_no: exerciseNo,
    answer_hashes: answerHashes,
    answers: answers,
  });
}

export async function getRankingList(lessonNo: number): Promise<GetRankings[]> {
  return await invokeFunc('lesson_ranking_get', { lesson_no: lessonNo });
}

export async function getUserProfileData(
  id?: string
): Promise<UserProfileData> {
  return await invokeFunc('user_profile_get', id ? { user_id: id } : {});
}

export async function getUserProgress() {
  try {
    const result = await invokeFunc('user_progress_get');

    // Stellen Sie sicher, dass wir ein gültiges Ergebnis haben
    if (!result || !result.data) {
      console.warn('Kein gültiges Ergebnis von user_progress_get erhalten');
      return {
        data: {
          lessonNo: 1,
          exerciseNo: 1,
          exercisePassedCount: 0,
          hasanatCounter: 0,
          totalExercises: 28,
        },
      };
    }

    return result;
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzerfortschritts:', error);
    // Rückgabe eines Standardobjekts im Fehlerfall
    return {
      data: {
        lessonNo: 1,
        exerciseNo: 1,
        exercisePassedCount: 0,
        hasanatCounter: 0,
        totalExercises: 28,
      },
    };
  }
}

export async function getUserWeeklyProgress() {
  return await invokeFunc('user_weekly_progress_get', {});
}

export async function getUserCurrentLesson() {
  return await invokeFunc('user_current_lesson_get', {});
}

export async function updateClientProfileData(profileData: {
  first_name?: string;
  last_name?: string;
  user_name?: string;
  age?: number;
  avatar?: string;
  gender?: string;
}) {
  console.log('Update profile data', profileData);

  return await invokeFunc('user_profile_update', {
    first_name: profileData.first_name,
    last_name: profileData.last_name,
    user_name: profileData.user_name,
  });
}

export async function sendFriendRequest(userId: string) {
  return await invokeFunc('user_friend_request_send', { receiver_id: userId });
}

export async function handleFriendRequest(
  requestId: string,
  accepted: boolean
) {
  return await invokeFunc('user_friend_request_handle', {
    request_id: requestId,
    action: accepted ? 'accepted' : 'rejected',
  });
}

export async function searchUsers(userName: string) {
  if (userName.length < 2) {
    throw new Error('Search query must be at least 2 characters long');
  }
  return await invokeFunc('user_search_by_username', { user_name: userName });
}

export async function adminGetAllUsers() {
  return await invokeFunc('admin_get_users', { page: 1, page_size: 10 });
}

export async function adminSetUserLessonState(
  clientId: string,
  lessonNo: number,
  exerciseNo: number
) {
  return await invokeFunc('admin_lesson_state_update', {
    client_id: clientId,
    lesson_no: lessonNo,
    exercise_no: exerciseNo,
  });
}

/**
 * Aktualisiert das Passwort eines Benutzers mit der nativen Supabase-Methode
 * @param password Das neue Passwort
 */
export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error('Fehler beim Aktualisieren des Passworts:', error.message);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Passworts:', error);
    throw error;
  }
}

/**
 * Sendet eine E-Mail zum Zurücksetzen des Passworts
 * @param email Die E-Mail-Adresse des Benutzers
 * @param redirectTo Die URL, zu der der Benutzer nach dem Zurücksetzen des Passworts weitergeleitet werden soll
 */
export async function resetPassword(email: string, redirectTo?: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) {
      console.error(
        'Fehler beim Senden der Passwort-Reset-E-Mail:',
        error.message
      );
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Fehler beim Senden der Passwort-Reset-E-Mail:', error);
    throw error;
  }
}
