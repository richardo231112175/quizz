'use client';

import { type JSX } from 'react';
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
        isFinished,
    }: usePlayQuizType = usePlayQuiz(play);

    console.log(totalTime);

    return (
        <h1>Hello World</h1>
    );
}
