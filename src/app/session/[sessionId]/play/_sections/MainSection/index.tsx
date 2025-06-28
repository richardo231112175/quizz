'use client';

import { type JSX } from 'react';
import { motion } from 'framer-motion';
import QuizHeader from '../../_components/QuizHeader';
import QuestionCard from '../../_components/QuestionCard';
import QuizNavigation from '../../_components/QuizNavigation';
import { type Play } from '../../page';
import { usePlayQuiz, type usePlayQuizType } from './hooks';

type MainSectionProps = {
    play: Play;
};

export default function MainSection({ play }: MainSectionProps): JSX.Element {
    const {
        questions,
        setQuestions,
        current,
        setCurrent,
        totalTime,
        questionTime,
        isSubmitting,
        handleSubmit,
        fetchingQuestion,
        handleNextQuestion,
        isFinished,
        finishTime,
        playId,
    }: usePlayQuizType = usePlayQuiz(play);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <QuizHeader
                        title={play.quiz_session.title}
                        totalTime={totalTime}
                        current={current}
                        totalQuestion={play.play_details.length}
                        isFinished={isFinished}
                        finishTime={finishTime}
                    />
                    <QuestionCard
                        questions={questions}
                        setQuestions={setQuestions}
                        current={current}
                        questionTime={questionTime}
                        isSubmitting={isSubmitting}
                        handleSubmit={handleSubmit}
                    />
                    {questions[current].answered && (
                        <QuizNavigation
                            current={current}
                            setCurrent={setCurrent}
                            totalQuestion={play.play_details.length}
                            fetchingQuestion={fetchingQuestion}
                            handleNextQuestion={handleNextQuestion}
                            isFinished={isFinished}
                            playId={playId}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
