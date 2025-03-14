import { ApiReadingExerciseAnswer } from '@/models/api_responses';
import {
  FunctionInvokeOptions,
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';
import { supabase } from './supabase_client';
import {
  SignUpDto,
  UserLessonState,
  GetReadingExercise,
  ExerciseResult,
  GetRankings,
  UserProfileData,
} from './types/api_types';
import { hashPassword } from '@/lib/utils';

async function invokeFunc(
  functionName: string,
  body?: FunctionInvokeOptions['body']
) {
  try {
    // console.log('func', functionName, body);
    const { session } = (await supabase.auth.getSession()).data;

    if (!session) {
      throw new Error('No active session found');
    }

    const { data, error } = await supabase.functions.invoke(functionName, {
      headers: {
        'refresh-token': session.refresh_token,
      },
      body,
    });

    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      console.log('Function returned an error', errorMessage);
      throw error;
    } else if (error instanceof FunctionsRelayError) {
      console.log('Relay error:', error.message);
      throw error;
    } else if (error instanceof FunctionsFetchError) {
      console.log('Fetch error:', error.message);
      throw error;
    } else if (error) {
      console.log('Unknown error:', error);
      throw error;
    }

    return data.data;
  } catch (error) {
    console.error(`Error invoking function ${functionName}:`, error);
    // Im Entwicklungsmodus Mock-Daten zurückgeben
    if (process.env.NODE_ENV === 'development') {
      console.log(`Returning mock data for ${functionName}`);
      return getMockData(functionName, body);
    }
    throw error;
  }
}

// Mock-Daten für die Entwicklung
function getMockData(functionName: string, body?: unknown): unknown {
  const typedBody = body as Record<string, unknown>;

  switch (functionName) {
    case 'user_lesson_state_get':
      return {
        exercise_no: 1,
        exercise_passed_count: 0,
        hasanat_counter: 0,
        last_active_exercise_no: 1,
        last_active_lesson_no: 1,
        lesson_no: 1,
      };
    case 'exercise_get':
      return {
        lesson_no: typedBody?.lesson_no || 1,
        exercise_no: typedBody?.exercise_no || 1,
        num_exercises_of_lesson: 3,
        exercise_type: 'reading',
        answer_hashes: [],
        questions: [
          {
            text: 'Mock Question',
            mp3_url: '',
            translation: 'Mock Translation',
            correct_answers: ['Correct Answer'],
            wrong_answers: ['Wrong Answer 1', 'Wrong Answer 2'],
          },
        ],
      };
    default:
      return null;
  }
}

export async function signUp(dto: SignUpDto) {
  // Passwort-Hashing wird jetzt in der signUp-Funktion nicht mehr durchgeführt
  return await invokeFunc('auth_register', dto);
}

export async function signIn(email: string, password: string) {
  try {
    // Use the native hashPassword function from utils.ts
    // const hashedPassword =
    //   typeof window !== 'undefined' ? await hashPassword(password) : password;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password,
    });

    if (error) {
      console.error('Sign in error:', error.message);
      throw error;
    }

    const token = data?.session?.access_token;

    if (token) {
      supabase.functions.setAuth(token);
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);

    // Im Entwicklungsmodus Mock-Daten zurückgeben
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock sign-in data');
      return {
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh-token',
          user: { email, id: 'mock-id' },
        },
        user: { email, id: 'mock-id' },
      };
    }

    throw error;
  }
}

export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
  await supabase.auth.signOut();
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

export async function changePassword(
  currentPassword: string,
  password: string
) {
  // Use the native hashPassword function from utils.ts
  const hashedCurrentPassword = await hashPassword(currentPassword);
  const hashedPassword = await hashPassword(password);
  return await invokeFunc('auth_change_password', {
    current_hashed_password: hashedCurrentPassword,
    new_hashed_password: hashedPassword,
  });
}

// export async function changeEmail(newEmail: string) {
//   console.log('Change email', newEmail);

//   const session = (await supabase.auth.getSession()).data.session;

//   supabase.functions.setAuth(session.access_token);

//   console.log(session)
//   // return;

//   const { data, error } = await supabase.functions.invoke('change_email', {
//     method: 'POST',
//     headers: {
//       'Refresh': session.refresh_token
//     },
//     body: {
//       new_email: newEmail,
//     },
//   });

//   /**
//    * FunctionsHttpError: if your function throws an error,
//    * FunctionsRelayError: if the Supabase Relay has an error processing your function
//    * FunctionsFetchError: if there is a network error in calling your function
//    */
//   if (error instanceof FunctionsHttpError) {
//     const errorMessage = await error.context.json();
//     console.log('Function returned an error', errorMessage);
//     // throw error;
//   } else if (error instanceof FunctionsRelayError) {
//     console.log('Relay error:', error.message);
//     // throw error;
//   } else if (error instanceof FunctionsFetchError) {
//     console.log('Fetch error:', error.message);
//     // throw error;
//   }

//   console.log('Change email error', error);
//   console.log('Change email response', data);

//   return data.data;
// }
