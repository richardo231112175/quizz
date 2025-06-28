import type { JSX, Dispatch, SetStateAction } from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/Button';
import { ShareButton } from '@/components/ShareButton';
import { formatTimeSpent } from '@/lib/formatTime';
import { type QuizResults } from '../../_sections/MainSection/hooks';

type ActionButtonsProps = {
    showDetail: boolean;
    setShowDetail: Dispatch<SetStateAction<boolean>>;
    results: QuizResults;
    level: string;
};

export default function ActionButtons({ showDetail, setShowDetail, results, level }: ActionButtonsProps): JSX.Element {
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
Your Answer: ${Array.isArray(result.userAnswer) ? result.userAnswer.join(', ') : result.userAnswer}
Correct Answer: ${Array.isArray(result.correctAnswer) ? result.correctAnswer.join(', ') : result.correctAnswer}
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

    return (
        <div className="flex flex-wrap gap-3 justify-between mb-8">
            <Button variant={showDetail ? 'default' : 'outline'} onClick={() => setShowDetail(!showDetail)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                {showDetail ? 'Hide' : 'View'} Detailed Results
            </Button>
            <div className="flex gap-3">
                <ShareButton />
                <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Download
                </Button>
            </div>
        </div>
    );
}
