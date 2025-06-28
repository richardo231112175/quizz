import { type JSX } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../QuestionCard';
import { type Questions } from '../../_sections/MainSection/hooks';

type DetailProps = {
    questions: Questions[];
};

export default function Detail({ questions }: DetailProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-8"
        >
            <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
            {questions.map((question, index) => (
                <QuestionCard key={index} index={index} question={question} />
            ))}
        </motion.div>
    );
}
