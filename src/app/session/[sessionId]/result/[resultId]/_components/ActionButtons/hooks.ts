import { formatTimeSpent } from '@/lib/formatTime';
import { type QuizResults } from '../../_sections/MainSection/hooks';

export type useActionButtonsType = {
    handleDownload: () => void;
};

export function useActionButtons(results: QuizResults, level: string): useActionButtonsType {
    function handleDownload(): void {
        const resultsText: string = `Quiz Results: ${results.quizTitle}

Overall Performance:
- Score: ${results.totalScore}/${results.maxPossibleScore} (${results.percentage}%)
- Correct Answers: ${results.correctAnswers}/${results.totalQuestions}
- Time Spent: ${formatTimeSpent(results.timeSpent)}
- Performance Level: ${level}

Detailed Results:
${results.questionResults.map((result, index) => `
Question ${index + 1}: ${result.question}
Your Answer: ${result.type === 'multiple_choice' ? result.answers.length ? `
${result.answers.map((answer) => `- ${answer}`).join('\n')}` : '' : result.answer ?? ''}
Correct Answer: ${result.type === 'multiple_choice' ? result.correctAnswers.length ? `
${result.correctAnswers.map((answer) => `- ${answer}`).join('\n')}` : '' : result.correctAnswer ?? ''}
Result: ${result.isCorrect ? 'Correct' : 'Incorrect'} (${result.score}/${result.maxScore} points)
`).join('')}
`;

        const blob: Blob = new Blob([ resultsText ], { type: 'text/plain' });
        const url: string = window.URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = `${results.quizTitle.replace(/\s+/g, '_')}_results.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return { handleDownload };
}
