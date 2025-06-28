'use client';

import { type JSX } from 'react';
import { motion } from 'framer-motion';
import Header from '../../_components/Header';
import Performance from '../../_components/Performance';
import Insight from '../../_components/Insight';
import ActionButtons from '../../_components/ActionButtons';
import Detail from '../../_components/Detail';
import { type Play } from '../../page';
import { useResult, type useResultType } from './hooks';

type MainSectionProps = {
    play: Play;
};

export default function MainSection({ play }: MainSectionProps): JSX.Element {
    const { showDetail, setShowDetail, results, performance }: useResultType = useResult(play);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Header
                        title={results.quizTitle}
                        color={performance.color}
                        bgColor={performance.bgColor}
                    />
                    <Performance
                        percentage={results.percentage}
                        correct={results.correctAnswers}
                        totalQuestions={results.totalQuestions}
                        score={results.totalScore}
                        maxScore={results.maxPossibleScore}
                        time={results.timeSpent}
                    />
                    <Insight
                        correctAnswers={results.correctAnswers}
                        totalQuestions={results.totalQuestions}
                        timeSpent={results.timeSpent}
                        color={performance.color}
                        bgColor={performance.bgColor}
                        level={performance.level}
                    />
                    <ActionButtons
                        showDetail={showDetail}
                        setShowDetail={setShowDetail}
                        results={results}
                        level={performance.level}
                    />
                    {showDetail && <Detail questions={results.questionResults} />}
                </motion.div>
            </div>
        </div>
    );
}
