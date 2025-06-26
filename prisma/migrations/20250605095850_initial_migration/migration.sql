-- CreateEnum
CREATE TYPE "QuizSessionDifficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateEnum
CREATE TYPE "QuizSessionCategory" AS ENUM ('science', 'history', 'geography', 'technology', 'arts', 'sports', 'music', 'health');

-- CreateEnum
CREATE TYPE "QuizSessionVisibility" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('single_choice', 'multiple_choice', 'open_ended');

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
CREATE TABLE "QuizSession" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "difficulty" "QuizSessionDifficulty" NOT NULL,
    "category" "QuizSessionCategory" NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "visibility" "QuizSessionVisibility" NOT NULL DEFAULT 'public',
    "password" VARCHAR(100),
    "show_answers" BOOLEAN NOT NULL,
    "allow_retake" BOOLEAN NOT NULL,
    "single_choice" INTEGER NOT NULL,
    "multiple_choice" INTEGER NOT NULL,
    "open_ended" INTEGER NOT NULL,
    "open_time" TIMESTAMP(3) NOT NULL,
    "close_time" TIMESTAMP(3) NOT NULL,
    "max_retakes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE INDEX "Quiz_clerk_id_idx" ON "Quiz"("clerk_id");

-- CreateIndex
CREATE INDEX "QuizSession_quiz_id_idx" ON "QuizSession"("quiz_id");

-- CreateIndex
CREATE INDEX "QuizSession_difficulty_idx" ON "QuizSession"("difficulty");

-- CreateIndex
CREATE INDEX "QuizSession_category_idx" ON "QuizSession"("category");

-- CreateIndex
CREATE INDEX "QuizSession_visibility_idx" ON "QuizSession"("visibility");

-- CreateIndex
CREATE INDEX "Question_quiz_id_idx" ON "Question"("quiz_id");

-- CreateIndex
CREATE INDEX "Question_type_idx" ON "Question"("type");

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
