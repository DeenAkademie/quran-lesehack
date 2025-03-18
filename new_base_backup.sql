

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE SCHEMA IF NOT EXISTS "da_qsk_reading_alpha";


ALTER SCHEMA "da_qsk_reading_alpha" OWNER TO "postgres";


CREATE SCHEMA IF NOT EXISTS "da_qsk_reading_alpha";


ALTER SCHEMA "da_qsk_reading_alpha" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE SCHEMA IF NOT EXISTS "next_auth";


ALTER SCHEMA "next_auth" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "da_qsk_reading_alpha"."activity" AS ENUM (
    'lesson',
    'reading-suras',
    'motivation-coaching',
    'qa'
);


ALTER TYPE "da_qsk_reading_alpha"."activity" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."activity_level" AS ENUM (
    'beginner',
    'advanced',
    'all'
);


ALTER TYPE "da_qsk_reading_alpha"."activity_level" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."client_plan" AS ENUM (
    'QSK_LIGHT',
    'QSK_BASIC'
);


ALTER TYPE "da_qsk_reading_alpha"."client_plan" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."client_role" AS ENUM (
    'admin',
    'student',
    'teacher',
    'teacher_admin'
);


ALTER TYPE "da_qsk_reading_alpha"."client_role" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."exercise_type" AS ENUM (
    'pattern',
    'word',
    'phrase',
    'verse'
);


ALTER TYPE "da_qsk_reading_alpha"."exercise_type" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."friend_request_status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE "da_qsk_reading_alpha"."friend_request_status" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."gender" AS ENUM (
    'male',
    'female'
);


ALTER TYPE "da_qsk_reading_alpha"."gender" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."lang_code" AS ENUM (
    'de',
    'en'
);


ALTER TYPE "da_qsk_reading_alpha"."lang_code" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."target_group" AS ENUM (
    'male',
    'female',
    'children',
    'all'
);


ALTER TYPE "da_qsk_reading_alpha"."target_group" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."week_day" AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);


ALTER TYPE "da_qsk_reading_alpha"."week_day" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."activity" AS ENUM (
    'lesson',
    'reading-suras',
    'motivation-coaching',
    'qa'
);


ALTER TYPE "da_qsk_reading_alpha"."activity" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."activity_level" AS ENUM (
    'beginner',
    'advanced',
    'all'
);


ALTER TYPE "da_qsk_reading_alpha"."activity_level" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."client_plan" AS ENUM (
    'QSK_LIGHT',
    'QSK_BASIC'
);


ALTER TYPE "da_qsk_reading_alpha"."client_plan" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."client_role" AS ENUM (
    'admin',
    'student',
    'teacher',
    'teacher_admin'
);


ALTER TYPE "da_qsk_reading_alpha"."client_role" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."exercise_type" AS ENUM (
    'pattern',
    'word',
    'phrase',
    'verse'
);


ALTER TYPE "da_qsk_reading_alpha"."exercise_type" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."friend_request_status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE "da_qsk_reading_alpha"."friend_request_status" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."gender" AS ENUM (
    'male',
    'female'
);


ALTER TYPE "da_qsk_reading_alpha"."gender" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."lang_code" AS ENUM (
    'de',
    'en'
);


ALTER TYPE "da_qsk_reading_alpha"."lang_code" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."target_group" AS ENUM (
    'male',
    'female',
    'children',
    'all'
);


ALTER TYPE "da_qsk_reading_alpha"."target_group" OWNER TO "postgres";


CREATE TYPE "da_qsk_reading_alpha"."week_day" AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);


ALTER TYPE "da_qsk_reading_alpha"."week_day" OWNER TO "postgres";


CREATE TYPE "public"."activity_enum" AS ENUM (
    'lesson',
    'reading-suras',
    'motivation-coaching',
    'qa'
);


ALTER TYPE "public"."activity_enum" OWNER TO "postgres";


CREATE TYPE "public"."activity_level_enum" AS ENUM (
    'beginner',
    'advanced',
    'all'
);


ALTER TYPE "public"."activity_level_enum" OWNER TO "postgres";


CREATE TYPE "public"."exercise_type" AS ENUM (
    'pattern',
    'word',
    'phrase',
    'verse'
);


ALTER TYPE "public"."exercise_type" OWNER TO "postgres";


CREATE TYPE "public"."friend_request_status" AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE "public"."friend_request_status" OWNER TO "postgres";


CREATE TYPE "public"."gender" AS ENUM (
    'male',
    'female'
);


ALTER TYPE "public"."gender" OWNER TO "postgres";


CREATE TYPE "public"."lang_code" AS ENUM (
    'de',
    'en'
);


ALTER TYPE "public"."lang_code" OWNER TO "postgres";


CREATE TYPE "public"."lang_enum" AS ENUM (
    'de',
    'en'
);


ALTER TYPE "public"."lang_enum" OWNER TO "postgres";


CREATE TYPE "public"."plan" AS ENUM (
    'QSK_LIGHT',
    'QSK_BASIC'
);


ALTER TYPE "public"."plan" OWNER TO "postgres";


CREATE TYPE "public"."role" AS ENUM (
    'admin',
    'student',
    'teacher'
);


ALTER TYPE "public"."role" OWNER TO "postgres";


CREATE TYPE "public"."target_group" AS ENUM (
    'male',
    'female',
    'children',
    'all'
);


ALTER TYPE "public"."target_group" OWNER TO "postgres";


CREATE TYPE "public"."target_group_enum" AS ENUM (
    'male',
    'female',
    'children',
    'all'
);


ALTER TYPE "public"."target_group_enum" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
    DELETE FROM rankings
    WHERE id IN (
        SELECT id
        FROM rankings
        WHERE lesson_no = NEW.lesson_no
        ORDER BY points DESC
        OFFSET 25
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  INSERT INTO clients (auth_id, user_name, email, first_name, last_name, gender, plan_id)
  VALUES (
    NEW.id,
    'user-' || SUBSTRING(CAST(NEW.id AS TEXT) FROM LENGTH(CAST(NEW.id AS TEXT)) - 4),
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    (NEW.raw_user_meta_data ->> 'gender')::gender,
    (select id from da_qsk_reading_alpha.plans where title = (NEW.raw_user_meta_data ->> 'plan')::client_plan)
  );

  INSERT INTO clients_settings(client_id, lang_code)
  VALUES (NEW.id, 'de'::lang_code);

  INSERT INTO clients_lesson_state (client_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  EXECUTE 'ALTER SEQUENCE ' || TG_TABLE_NAME || '_id_seq RESTART WITH 1';
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.is_active = false;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."update_friend_request"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."update_friend_request"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
    DELETE FROM rankings
    WHERE id IN (
        SELECT id
        FROM rankings
        WHERE lesson_no = NEW.lesson_no
        ORDER BY points DESC
        OFFSET 25
    );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  INSERT INTO clients (auth_id, user_name, email)
  VALUES (
    NEW.id,
    'user-' || SUBSTRING(CAST(NEW.id AS TEXT) FROM LENGTH(CAST(NEW.id AS TEXT)) - 4),
    NEW.email
  );

  INSERT INTO clients_settings(client_id, lang_code)
  VALUES (NEW.id, 'de'::lang_code);

  INSERT INTO clients_lesson_state (client_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  EXECUTE 'ALTER SEQUENCE ' || TG_TABLE_NAME || '_id_seq RESTART WITH 1';
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.is_active = false;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "da_qsk_reading_alpha"."update_friend_request"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'da_qsk_reading_alpha'
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "da_qsk_reading_alpha"."update_friend_request"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "next_auth"."uid"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim.sub', true), ''),
        (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;


ALTER FUNCTION "next_auth"."uid"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."badges" (
    "id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "svg" "text" NOT NULL
);


ALTER TABLE "da_qsk_reading_alpha"."badges" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."badges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."badges_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."badges_id_seq" OWNED BY "da_qsk_reading_alpha"."badges"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients" (
    "auth_id" "uuid" NOT NULL,
    "parent_id" "uuid",
    "email" character varying(100),
    "first_name" character varying(30) DEFAULT ''::character varying,
    "last_name" character varying(30) DEFAULT ''::character varying,
    "user_name" character varying(30) NOT NULL,
    "gender" "da_qsk_reading_alpha"."gender" DEFAULT 'male'::"da_qsk_reading_alpha"."gender" NOT NULL,
    "role" "da_qsk_reading_alpha"."client_role" DEFAULT 'student'::"da_qsk_reading_alpha"."client_role" NOT NULL,
    "did_set_password" boolean DEFAULT false,
    "avatar" character varying DEFAULT ''::character varying,
    "badges" smallint[] DEFAULT '{}'::smallint[],
    "plan_id" "uuid",
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."clients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients_lesson_state" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint DEFAULT 1 NOT NULL,
    "exercise_no" smallint DEFAULT 1 NOT NULL,
    "exercise_passed_count" smallint DEFAULT 0 NOT NULL,
    "hasanat_counter" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "clients_lesson_state_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48))),
    CONSTRAINT "clients_lesson_state_exercise_no_check1" CHECK ((("exercise_no" >= 0) AND ("exercise_no" <= 3)))
);


ALTER TABLE "da_qsk_reading_alpha"."clients_lesson_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "notification_learn_reminders" boolean DEFAULT true,
    "notification_feature_updates" boolean DEFAULT true,
    "notification_live_call" boolean DEFAULT true,
    "lang_code" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code"
);


ALTER TABLE "da_qsk_reading_alpha"."clients_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "lesson_no" smallint NOT NULL,
    "exercise_no" smallint NOT NULL,
    "exercise_type" "da_qsk_reading_alpha"."exercise_type" DEFAULT 'pattern'::"da_qsk_reading_alpha"."exercise_type",
    CONSTRAINT "exercises_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48)))
);


ALTER TABLE "da_qsk_reading_alpha"."exercises" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."exercise_types_per_lesson_view" AS
 SELECT "exercises"."lesson_no",
    "min"("exercises"."exercise_no") AS "exercise_no",
    "exercises"."exercise_type"
   FROM "da_qsk_reading_alpha"."exercises"
  GROUP BY "exercises"."lesson_no", "exercises"."exercise_type"
  ORDER BY "exercises"."lesson_no", ("min"("exercises"."exercise_no"));


ALTER TABLE "da_qsk_reading_alpha"."exercise_types_per_lesson_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises_questions_de" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "text" character varying(256),
    "mp3_url" character varying,
    "translation" character varying(256) DEFAULT ''::character varying,
    "correct_answers" character varying(100)[],
    "wrong_answers" character varying(100)[]
);


ALTER TABLE "da_qsk_reading_alpha"."exercises_questions_de" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises_questions_en" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "text" character varying(256),
    "mp3_url" character varying,
    "translation" character varying(256) DEFAULT ''::character varying,
    "correct_answers" character varying(100)[],
    "wrong_answers" character varying(100)[]
);


ALTER TABLE "da_qsk_reading_alpha"."exercises_questions_en" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."friend_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "receiver_id" "uuid" NOT NULL,
    "status" "da_qsk_reading_alpha"."friend_request_status" DEFAULT 'pending'::"da_qsk_reading_alpha"."friend_request_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);


ALTER TABLE "da_qsk_reading_alpha"."friend_requests" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."friend_requests_with_avatars" AS
 SELECT "r"."id",
    "r"."sender_id",
    "r"."receiver_id",
    "r"."status",
    "r"."created_at",
    "c"."avatar",
    "c"."user_name"
   FROM ("da_qsk_reading_alpha"."friend_requests" "r"
     LEFT JOIN "da_qsk_reading_alpha"."clients" "c" ON (("r"."sender_id" = "c"."auth_id")));


ALTER TABLE "da_qsk_reading_alpha"."friend_requests_with_avatars" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."lessons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "lesson_no" smallint NOT NULL,
    "num_exercises" smallint NOT NULL,
    "letter" character(1) NOT NULL,
    CONSTRAINT "lessons_lesson_no_check" CHECK ((("lesson_no" >= 1) AND ("lesson_no" <= 28))),
    CONSTRAINT "lessons_num_exercises_check" CHECK ((("num_exercises" >= 1) AND ("num_exercises" <= 48)))
);


ALTER TABLE "da_qsk_reading_alpha"."lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls" (
    "id" integer NOT NULL,
    "target_group" "da_qsk_reading_alpha"."target_group" NOT NULL,
    "weekday" "da_qsk_reading_alpha"."week_day" NOT NULL,
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL,
    "teacher_id" integer NOT NULL,
    "min_lesson" smallint,
    "max_lesson" smallint,
    "activity" "da_qsk_reading_alpha"."activity",
    "activity_level" "da_qsk_reading_alpha"."activity_level",
    "lang" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code" NOT NULL,
    CONSTRAINT "live_calls_max_lesson_check" CHECK ((("max_lesson" >= 1) AND ("max_lesson" <= 28))),
    CONSTRAINT "live_calls_min_lesson_check" CHECK ((("min_lesson" >= 1) AND ("min_lesson" <= 28)))
);


ALTER TABLE "da_qsk_reading_alpha"."live_calls" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."live_calls_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."live_calls_id_seq" OWNED BY "da_qsk_reading_alpha"."live_calls"."id";



CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls_teacher_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" OWNED BY "da_qsk_reading_alpha"."live_calls"."teacher_id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."plans" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "da_qsk_reading_alpha"."client_plan" DEFAULT 'QSK_LIGHT'::"da_qsk_reading_alpha"."client_plan" NOT NULL,
    "features" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."plans" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."rankings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint NOT NULL,
    "points" numeric NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."rankings" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."ranking_with_avatars" AS
 SELECT "r"."id",
    "r"."client_id",
    "r"."lesson_no",
    "r"."points",
    "r"."created_at",
    "c"."avatar",
    "c"."user_name"
   FROM ("da_qsk_reading_alpha"."rankings" "r"
     LEFT JOIN "da_qsk_reading_alpha"."clients" "c" ON (("r"."client_id" = "c"."auth_id")));


ALTER TABLE "da_qsk_reading_alpha"."ranking_with_avatars" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."submitted_exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "exercise_no" smallint NOT NULL,
    "time_ms" smallint NOT NULL,
    "points" numeric(5,2) DEFAULT 0 NOT NULL,
    "num_correct_answers" smallint NOT NULL,
    "lesson_progress" numeric(3,2) NOT NULL,
    "has_passed_exercise" boolean DEFAULT false,
    "has_passed_lesson" boolean DEFAULT false,
    "earned_hasanat" smallint DEFAULT 0 NOT NULL,
    "submitted_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    CONSTRAINT "submitted_exercises_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48))),
    CONSTRAINT "submitted_exercises_lesson_progress_check" CHECK ((("lesson_progress" >= (0)::numeric) AND ("lesson_progress" <= (1)::numeric))),
    CONSTRAINT "submitted_exercises_num_correct_answers_check" CHECK ((("num_correct_answers" >= 0) AND ("num_correct_answers" <= 10))),
    CONSTRAINT "submitted_exercises_points_check" CHECK ((("points" >= (0)::numeric) AND ("points" <= (100)::numeric))),
    CONSTRAINT "submitted_exercises_time_ms_check" CHECK (("time_ms" >= 0))
);


ALTER TABLE "da_qsk_reading_alpha"."submitted_exercises" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."teachers" (
    "id" integer NOT NULL,
    "first_name" character varying(32) NOT NULL,
    "last_name" character varying(32) NOT NULL,
    "gender" "da_qsk_reading_alpha"."gender" DEFAULT 'male'::"da_qsk_reading_alpha"."gender" NOT NULL,
    "zoom_link" "text",
    "is_substitution" boolean DEFAULT false
);


ALTER TABLE "da_qsk_reading_alpha"."teachers" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."teachers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."teachers_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."teachers_id_seq" OWNED BY "da_qsk_reading_alpha"."teachers"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."video_urls" (
    "id" integer NOT NULL,
    "vimeo_id" character varying(32),
    "url" character varying,
    "quality" smallint,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    CONSTRAINT "video_urls_quality_check" CHECK (("quality" >= 240))
);


ALTER TABLE "da_qsk_reading_alpha"."video_urls" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."video_urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."video_urls_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."video_urls_id_seq" OWNED BY "da_qsk_reading_alpha"."video_urls"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."videos" (
    "id" integer NOT NULL,
    "lesson_no" smallint,
    "week_no" smallint,
    "part" smallint,
    "vimeo_id" character varying(32) NOT NULL,
    "vimeo_hash" character varying(32),
    "title" character varying(256),
    "description" character varying(256),
    "is_children" boolean DEFAULT false,
    "lang_code" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code",
    CONSTRAINT "videos_lesson_no_check" CHECK ((("lesson_no" >= 1) AND ("lesson_no" <= 28))),
    CONSTRAINT "videos_part_check" CHECK (("part" >= 1)),
    CONSTRAINT "videos_week_no_check" CHECK (("week_no" >= 1))
);


ALTER TABLE "da_qsk_reading_alpha"."videos" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."videos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."videos_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."videos_id_seq" OWNED BY "da_qsk_reading_alpha"."videos"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."badges" (
    "id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "svg" "text" NOT NULL
);


ALTER TABLE "da_qsk_reading_alpha"."badges" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."badges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."badges_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."badges_id_seq" OWNED BY "da_qsk_reading_alpha"."badges"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients" (
    "auth_id" "uuid" NOT NULL,
    "parent_id" "uuid",
    "email" character varying(100),
    "first_name" character varying(30) DEFAULT ''::character varying,
    "last_name" character varying(30) DEFAULT ''::character varying,
    "user_name" character varying(30) NOT NULL,
    "gender" "da_qsk_reading_alpha"."gender" DEFAULT 'male'::"da_qsk_reading_alpha"."gender" NOT NULL,
    "role" "da_qsk_reading_alpha"."client_role" DEFAULT 'student'::"da_qsk_reading_alpha"."client_role" NOT NULL,
    "did_set_password" boolean DEFAULT false,
    "avatar" character varying DEFAULT ''::character varying,
    "badges" smallint[] DEFAULT '{}'::smallint[],
    "plan_id" "uuid",
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."clients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients_lesson_state" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint DEFAULT 1 NOT NULL,
    "exercise_no" smallint DEFAULT 1 NOT NULL,
    "exercise_passed_count" smallint DEFAULT 0 NOT NULL,
    "hasanat_counter" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "clients_lesson_state_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48))),
    CONSTRAINT "clients_lesson_state_exercise_no_check1" CHECK ((("exercise_no" >= 0) AND ("exercise_no" <= 3)))
);


ALTER TABLE "da_qsk_reading_alpha"."clients_lesson_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."clients_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "notification_learn_reminders" boolean DEFAULT true,
    "notification_feature_updates" boolean DEFAULT true,
    "notification_live_call" boolean DEFAULT true,
    "lang_code" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code"
);


ALTER TABLE "da_qsk_reading_alpha"."clients_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "lesson_no" smallint NOT NULL,
    "exercise_no" smallint NOT NULL,
    "exercise_type" "da_qsk_reading_alpha"."exercise_type" DEFAULT 'pattern'::"da_qsk_reading_alpha"."exercise_type",
    CONSTRAINT "exercises_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48)))
);


ALTER TABLE "da_qsk_reading_alpha"."exercises" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."exercise_types_per_lesson_view" AS
 SELECT "exercises"."lesson_no",
    "min"("exercises"."exercise_no") AS "exercise_no",
    "exercises"."exercise_type"
   FROM "da_qsk_reading_alpha"."exercises"
  GROUP BY "exercises"."lesson_no", "exercises"."exercise_type"
  ORDER BY "exercises"."lesson_no", ("min"("exercises"."exercise_no"));


ALTER TABLE "da_qsk_reading_alpha"."exercise_types_per_lesson_view" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises_questions_de" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "text" character varying(256),
    "mp3_url" character varying,
    "translation" character varying(256) DEFAULT ''::character varying,
    "correct_answers" character varying(100)[],
    "wrong_answers" character varying(100)[]
);


ALTER TABLE "da_qsk_reading_alpha"."exercises_questions_de" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."exercises_questions_en" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "text" character varying(256),
    "mp3_url" character varying,
    "translation" character varying(256) DEFAULT ''::character varying,
    "correct_answers" character varying(100)[],
    "wrong_answers" character varying(100)[]
);


ALTER TABLE "da_qsk_reading_alpha"."exercises_questions_en" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."friend_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "receiver_id" "uuid" NOT NULL,
    "status" "da_qsk_reading_alpha"."friend_request_status" DEFAULT 'pending'::"da_qsk_reading_alpha"."friend_request_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);


ALTER TABLE "da_qsk_reading_alpha"."friend_requests" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."friend_requests_with_avatars" AS
 SELECT "r"."id",
    "r"."sender_id",
    "r"."receiver_id",
    "r"."status",
    "r"."created_at",
    "c"."avatar",
    "c"."user_name"
   FROM ("da_qsk_reading_alpha"."friend_requests" "r"
     LEFT JOIN "da_qsk_reading_alpha"."clients" "c" ON (("r"."sender_id" = "c"."auth_id")));


ALTER TABLE "da_qsk_reading_alpha"."friend_requests_with_avatars" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."lessons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "lesson_no" smallint NOT NULL,
    "num_exercises" smallint NOT NULL,
    "letter" character(1) NOT NULL,
    CONSTRAINT "lessons_lesson_no_check" CHECK ((("lesson_no" >= 1) AND ("lesson_no" <= 28))),
    CONSTRAINT "lessons_num_exercises_check" CHECK ((("num_exercises" >= 1) AND ("num_exercises" <= 48)))
);


ALTER TABLE "da_qsk_reading_alpha"."lessons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls" (
    "id" integer NOT NULL,
    "target_group" "da_qsk_reading_alpha"."target_group" NOT NULL,
    "weekday" "da_qsk_reading_alpha"."week_day" NOT NULL,
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL,
    "teacher_id" integer NOT NULL,
    "min_lesson" smallint,
    "max_lesson" smallint,
    "activity" "da_qsk_reading_alpha"."activity",
    "activity_level" "da_qsk_reading_alpha"."activity_level",
    "lang" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code" NOT NULL,
    CONSTRAINT "live_calls_max_lesson_check" CHECK ((("max_lesson" >= 1) AND ("max_lesson" <= 28))),
    CONSTRAINT "live_calls_min_lesson_check" CHECK ((("min_lesson" >= 1) AND ("min_lesson" <= 28)))
);


ALTER TABLE "da_qsk_reading_alpha"."live_calls" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."live_calls_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."live_calls_id_seq" OWNED BY "da_qsk_reading_alpha"."live_calls"."id";



CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."live_calls_teacher_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" OWNED BY "da_qsk_reading_alpha"."live_calls"."teacher_id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."plans" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "da_qsk_reading_alpha"."client_plan" DEFAULT 'QSK_LIGHT'::"da_qsk_reading_alpha"."client_plan" NOT NULL,
    "features" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."plans" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."rankings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint NOT NULL,
    "points" numeric NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);


ALTER TABLE "da_qsk_reading_alpha"."rankings" OWNER TO "postgres";


CREATE OR REPLACE VIEW "da_qsk_reading_alpha"."ranking_with_avatars" AS
 SELECT "r"."id",
    "r"."client_id",
    "r"."lesson_no",
    "r"."points",
    "r"."created_at",
    "c"."avatar",
    "c"."user_name"
   FROM ("da_qsk_reading_alpha"."rankings" "r"
     LEFT JOIN "da_qsk_reading_alpha"."clients" "c" ON (("r"."client_id" = "c"."auth_id")));


ALTER TABLE "da_qsk_reading_alpha"."ranking_with_avatars" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."submitted_exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "client_id" "uuid" NOT NULL,
    "lesson_no" smallint NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "exercise_no" smallint NOT NULL,
    "time_ms" smallint NOT NULL,
    "points" numeric(5,2) DEFAULT 0 NOT NULL,
    "num_correct_answers" smallint NOT NULL,
    "lesson_progress" numeric(3,2) NOT NULL,
    "has_passed_exercise" boolean DEFAULT false,
    "has_passed_lesson" boolean DEFAULT false,
    "submitted_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    CONSTRAINT "submitted_exercises_exercise_no_check" CHECK ((("exercise_no" >= 1) AND ("exercise_no" <= 48))),
    CONSTRAINT "submitted_exercises_lesson_progress_check" CHECK ((("lesson_progress" >= (0)::numeric) AND ("lesson_progress" <= (1)::numeric))),
    CONSTRAINT "submitted_exercises_num_correct_answers_check" CHECK ((("num_correct_answers" >= 0) AND ("num_correct_answers" <= 10))),
    CONSTRAINT "submitted_exercises_points_check" CHECK ((("points" >= (0)::numeric) AND ("points" <= (100)::numeric))),
    CONSTRAINT "submitted_exercises_time_ms_check" CHECK (("time_ms" >= 0))
);


ALTER TABLE "da_qsk_reading_alpha"."submitted_exercises" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."teachers" (
    "id" integer NOT NULL,
    "first_name" character varying(32) NOT NULL,
    "last_name" character varying(32) NOT NULL,
    "gender" "da_qsk_reading_alpha"."gender" DEFAULT 'male'::"da_qsk_reading_alpha"."gender" NOT NULL,
    "zoom_link" "text",
    "is_substitution" boolean DEFAULT false
);


ALTER TABLE "da_qsk_reading_alpha"."teachers" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."teachers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."teachers_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."teachers_id_seq" OWNED BY "da_qsk_reading_alpha"."teachers"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."video_urls" (
    "id" integer NOT NULL,
    "vimeo_id" character varying(32),
    "url" character varying,
    "quality" smallint,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    CONSTRAINT "video_urls_quality_check" CHECK (("quality" >= 240))
);


ALTER TABLE "da_qsk_reading_alpha"."video_urls" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."video_urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."video_urls_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."video_urls_id_seq" OWNED BY "da_qsk_reading_alpha"."video_urls"."id";



CREATE TABLE IF NOT EXISTS "da_qsk_reading_alpha"."videos" (
    "id" integer NOT NULL,
    "lesson_no" smallint,
    "week_no" smallint,
    "part" smallint,
    "vimeo_id" character varying(32) NOT NULL,
    "vimeo_hash" character varying(32),
    "title" character varying(256),
    "description" character varying(256),
    "is_children" boolean DEFAULT false,
    "lang_code" "da_qsk_reading_alpha"."lang_code" DEFAULT 'de'::"da_qsk_reading_alpha"."lang_code",
    CONSTRAINT "videos_lesson_no_check" CHECK ((("lesson_no" >= 1) AND ("lesson_no" <= 28))),
    CONSTRAINT "videos_part_check" CHECK (("part" >= 1)),
    CONSTRAINT "videos_week_no_check" CHECK (("week_no" >= 1))
);


ALTER TABLE "da_qsk_reading_alpha"."videos" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "da_qsk_reading_alpha"."videos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "da_qsk_reading_alpha"."videos_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "da_qsk_reading_alpha"."videos_id_seq" OWNED BY "da_qsk_reading_alpha"."videos"."id";



CREATE TABLE IF NOT EXISTS "next_auth"."accounts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" bigint,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text",
    "oauth_token_secret" "text",
    "oauth_token" "text",
    "userId" "uuid"
);


ALTER TABLE "next_auth"."accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "next_auth"."sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "sessionToken" "text" NOT NULL,
    "userId" "uuid"
);


ALTER TABLE "next_auth"."sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "next_auth"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "email" "text",
    "emailVerified" timestamp with time zone,
    "image" "text"
);


ALTER TABLE "next_auth"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "next_auth"."verification_tokens" (
    "identifier" "text",
    "token" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL
);


ALTER TABLE "next_auth"."verification_tokens" OWNER TO "postgres";


ALTER TABLE ONLY "da_qsk_reading_alpha"."badges" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."badges_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."live_calls_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls" ALTER COLUMN "teacher_id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."live_calls_teacher_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."teachers" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."teachers_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."video_urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."video_urls_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."videos_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."badges" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."badges_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."live_calls_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls" ALTER COLUMN "teacher_id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."live_calls_teacher_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."teachers" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."teachers_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."video_urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."video_urls_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos" ALTER COLUMN "id" SET DEFAULT "nextval"('"da_qsk_reading_alpha"."videos_id_seq"'::"regclass");



ALTER TABLE ONLY "da_qsk_reading_alpha"."badges"
    ADD CONSTRAINT "badges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."badges"
    ADD CONSTRAINT "badges_title_key" UNIQUE ("title");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_client_id_key" UNIQUE ("client_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("auth_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_settings"
    ADD CONSTRAINT "clients_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_user_name_key" UNIQUE ("user_name");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises"
    ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_de"
    ADD CONSTRAINT "exercises_questions_de_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_en"
    ADD CONSTRAINT "exercises_questions_en_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_sender_id_receiver_id_key" UNIQUE ("sender_id", "receiver_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."lessons"
    ADD CONSTRAINT "lessons_lesson_no_key" UNIQUE ("lesson_no");



ALTER TABLE ONLY "da_qsk_reading_alpha"."lessons"
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls"
    ADD CONSTRAINT "live_calls_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."plans"
    ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."plans"
    ADD CONSTRAINT "plans_title_key" UNIQUE ("title");



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."teachers"
    ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."video_urls"
    ADD CONSTRAINT "video_urls_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos"
    ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos"
    ADD CONSTRAINT "videos_vimeo_id_key" UNIQUE ("vimeo_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."badges"
    ADD CONSTRAINT "badges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."badges"
    ADD CONSTRAINT "badges_title_key" UNIQUE ("title");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_client_id_key" UNIQUE ("client_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("auth_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_settings"
    ADD CONSTRAINT "clients_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_user_name_key" UNIQUE ("user_name");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises"
    ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_de"
    ADD CONSTRAINT "exercises_questions_de_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_en"
    ADD CONSTRAINT "exercises_questions_en_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_sender_id_receiver_id_key" UNIQUE ("sender_id", "receiver_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."lessons"
    ADD CONSTRAINT "lessons_lesson_no_key" UNIQUE ("lesson_no");



ALTER TABLE ONLY "da_qsk_reading_alpha"."lessons"
    ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls"
    ADD CONSTRAINT "live_calls_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."plans"
    ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."plans"
    ADD CONSTRAINT "plans_title_key" UNIQUE ("title");



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."teachers"
    ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."video_urls"
    ADD CONSTRAINT "video_urls_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos"
    ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."videos"
    ADD CONSTRAINT "videos_vimeo_id_key" UNIQUE ("vimeo_id");



ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "email_unique" UNIQUE ("email");



ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "provider_unique" UNIQUE ("provider", "providerAccountId");



ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessiontoken_unique" UNIQUE ("sessionToken");



ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "token_identifier_unique" UNIQUE ("token", "identifier");



ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token");



CREATE INDEX "idx_friend_requests" ON "da_qsk_reading_alpha"."friend_requests" USING "btree" ("status", "sender_id", "receiver_id");



CREATE INDEX "idx_friend_requests" ON "da_qsk_reading_alpha"."friend_requests" USING "btree" ("status", "sender_id", "receiver_id");



CREATE OR REPLACE TRIGGER "on_delete_client" BEFORE DELETE ON "da_qsk_reading_alpha"."clients" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."soft_delete_client"();



CREATE OR REPLACE TRIGGER "on_delete_video_urls" AFTER DELETE ON "da_qsk_reading_alpha"."video_urls" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"();



CREATE OR REPLACE TRIGGER "on_insert_ranking" AFTER INSERT ON "da_qsk_reading_alpha"."rankings" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"();



CREATE OR REPLACE TRIGGER "on_update_client" AFTER INSERT OR UPDATE ON "da_qsk_reading_alpha"."clients" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"();



CREATE OR REPLACE TRIGGER "on_update_friend_request" AFTER INSERT OR UPDATE ON "da_qsk_reading_alpha"."friend_requests" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."update_friend_request"();



CREATE OR REPLACE TRIGGER "on_delete_client" BEFORE DELETE ON "da_qsk_reading_alpha"."clients" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."soft_delete_client"();



CREATE OR REPLACE TRIGGER "on_delete_video_urls" AFTER DELETE ON "da_qsk_reading_alpha"."video_urls" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"();



CREATE OR REPLACE TRIGGER "on_insert_ranking" AFTER INSERT ON "da_qsk_reading_alpha"."rankings" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"();



CREATE OR REPLACE TRIGGER "on_update_client" AFTER INSERT OR UPDATE ON "da_qsk_reading_alpha"."clients" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"();



CREATE OR REPLACE TRIGGER "on_update_friend_request" AFTER INSERT OR UPDATE ON "da_qsk_reading_alpha"."friend_requests" FOR EACH ROW EXECUTE FUNCTION "da_qsk_reading_alpha"."update_friend_request"();



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "da_qsk_reading_alpha"."plans"("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_settings"
    ADD CONSTRAINT "clients_settings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises"
    ADD CONSTRAINT "exercises_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_de"
    ADD CONSTRAINT "exercises_questions_de_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_en"
    ADD CONSTRAINT "exercises_questions_en_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."live_calls"
    ADD CONSTRAINT "live_calls_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "da_qsk_reading_alpha"."teachers"("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."video_urls"
    ADD CONSTRAINT "video_urls_vimeo_id_fkey" FOREIGN KEY ("vimeo_id") REFERENCES "da_qsk_reading_alpha"."videos"("vimeo_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_lesson_state"
    ADD CONSTRAINT "clients_lesson_state_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients"
    ADD CONSTRAINT "clients_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "da_qsk_reading_alpha"."plans"("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."clients_settings"
    ADD CONSTRAINT "clients_settings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises"
    ADD CONSTRAINT "exercises_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_de"
    ADD CONSTRAINT "exercises_questions_de_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."exercises_questions_en"
    ADD CONSTRAINT "exercises_questions_en_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."friend_requests"
    ADD CONSTRAINT "friend_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."rankings"
    ADD CONSTRAINT "rankings_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "da_qsk_reading_alpha"."clients"("auth_id") ON DELETE CASCADE;



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "da_qsk_reading_alpha"."exercises"("id");



ALTER TABLE ONLY "da_qsk_reading_alpha"."submitted_exercises"
    ADD CONSTRAINT "submitted_exercises_lesson_no_fkey" FOREIGN KEY ("lesson_no") REFERENCES "da_qsk_reading_alpha"."lessons"("lesson_no") ON DELETE CASCADE;



ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";









GRANT USAGE ON SCHEMA "da_qsk_reading_alpha" TO "anon";
GRANT USAGE ON SCHEMA "da_qsk_reading_alpha" TO "authenticated";
GRANT USAGE ON SCHEMA "da_qsk_reading_alpha" TO "service_role";






GRANT USAGE ON SCHEMA "next_auth" TO "service_role";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
























GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."adjust_rankings_per_lesson"() TO "service_role";



GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."reset_serial_video_urls"() TO "service_role";



GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."soft_delete_client"() TO "service_role";



GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_clients_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_friend_request"() TO "anon";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_friend_request"() TO "authenticated";
GRANT ALL ON FUNCTION "da_qsk_reading_alpha"."update_friend_request"() TO "service_role";


























































































































































































GRANT ALL ON TABLE "da_qsk_reading_alpha"."badges" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."badges" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."badges" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."badges_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."badges_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."badges_id_seq" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_lesson_state" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_lesson_state" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_lesson_state" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_settings" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_settings" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."clients_settings" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercise_types_per_lesson_view" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercise_types_per_lesson_view" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercise_types_per_lesson_view" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_de" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_de" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_de" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_en" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_en" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."exercises_questions_en" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests_with_avatars" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests_with_avatars" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."friend_requests_with_avatars" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."lessons" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."lessons" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."lessons" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."live_calls" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."live_calls" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."live_calls" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."live_calls_teacher_id_seq" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."plans" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."plans" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."plans" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."rankings" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."rankings" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."rankings" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."ranking_with_avatars" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."ranking_with_avatars" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."ranking_with_avatars" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."submitted_exercises" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."submitted_exercises" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."submitted_exercises" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."teachers" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."teachers" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."teachers" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."teachers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."teachers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."teachers_id_seq" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."video_urls" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."video_urls" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."video_urls" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."video_urls_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."video_urls_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."video_urls_id_seq" TO "service_role";



GRANT ALL ON TABLE "da_qsk_reading_alpha"."videos" TO "anon";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."videos" TO "authenticated";
GRANT ALL ON TABLE "da_qsk_reading_alpha"."videos" TO "service_role";



GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."videos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."videos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "da_qsk_reading_alpha"."videos_id_seq" TO "service_role";









GRANT ALL ON TABLE "next_auth"."accounts" TO "service_role";



GRANT ALL ON TABLE "next_auth"."sessions" TO "service_role";



GRANT ALL ON TABLE "next_auth"."users" TO "service_role";



GRANT ALL ON TABLE "next_auth"."verification_tokens" TO "service_role";












ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON SEQUENCES  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON FUNCTIONS  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "da_qsk_reading_alpha" GRANT ALL ON TABLES  TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
