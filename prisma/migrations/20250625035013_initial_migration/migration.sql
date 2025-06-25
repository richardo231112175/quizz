-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('single_choice', 'multiple_choice', 'open_ended');

-- CreateEnum
CREATE TYPE "QuizSessionDifficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateEnum
CREATE TYPE "QuizSessionCategory" AS ENUM ('science', 'history', 'geography', 'technology', 'arts', 'sports', 'music', 'health');

-- CreateEnum
CREATE TYPE "QuizSessionVisibility" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "image_url" TEXT,
    "type" "QuestionType" NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "max_score" INTEGER NOT NULL,
    "single_choice_options" TEXT,
    "single_choice_correct" TEXT,
    "multiple_choice_options" TEXT,
    "multiple_choice_correct" TEXT,
    "open_ended_answer_key" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSession" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "difficulty" "QuizSessionDifficulty" NOT NULL,
    "category" "QuizSessionCategory" NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "visibility" "QuizSessionVisibility" NOT NULL DEFAULT 'public',
    "password" VARCHAR(100),
    "single_choice" INTEGER NOT NULL,
    "multiple_choice" INTEGER NOT NULL,
    "open_ended" INTEGER NOT NULL,
    "open_time" TIMESTAMP(3) NOT NULL,
    "close_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Play" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "quiz_session_id" INTEGER NOT NULL,
    "final_score" INTEGER NOT NULL DEFAULT 0,
    "max_score" INTEGER NOT NULL,
    "time_taken" INTEGER NOT NULL DEFAULT 0,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Play_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayDetail" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "play_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "time_taken" INTEGER NOT NULL DEFAULT 0,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),

    CONSTRAINT "PlayDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "quiz_session_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quiz_clerk_id_idx" ON "Quiz"("clerk_id");

-- CreateIndex
CREATE INDEX "Question_quiz_id_idx" ON "Question"("quiz_id");

-- CreateIndex
CREATE INDEX "Question_type_idx" ON "Question"("type");

-- CreateIndex
CREATE INDEX "QuizSession_quiz_id_idx" ON "QuizSession"("quiz_id");

-- CreateIndex
CREATE INDEX "QuizSession_difficulty_idx" ON "QuizSession"("difficulty");

-- CreateIndex
CREATE INDEX "QuizSession_category_idx" ON "QuizSession"("category");

-- CreateIndex
CREATE INDEX "QuizSession_visibility_idx" ON "QuizSession"("visibility");

-- CreateIndex
CREATE INDEX "PlayDetail_play_id_idx" ON "PlayDetail"("play_id");

-- CreateIndex
CREATE INDEX "PlayDetail_question_id_idx" ON "PlayDetail"("question_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_quiz_session_id_fkey" FOREIGN KEY ("quiz_session_id") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayDetail" ADD CONSTRAINT "PlayDetail_play_id_fkey" FOREIGN KEY ("play_id") REFERENCES "Play"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayDetail" ADD CONSTRAINT "PlayDetail_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_quiz_session_id_fkey" FOREIGN KEY ("quiz_session_id") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
