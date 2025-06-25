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

-- CreateIndex
CREATE INDEX "PlayDetail_play_id_idx" ON "PlayDetail"("play_id");

-- CreateIndex
CREATE INDEX "PlayDetail_question_id_idx" ON "PlayDetail"("question_id");

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_quiz_session_id_fkey" FOREIGN KEY ("quiz_session_id") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayDetail" ADD CONSTRAINT "PlayDetail_play_id_fkey" FOREIGN KEY ("play_id") REFERENCES "Play"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayDetail" ADD CONSTRAINT "PlayDetail_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
