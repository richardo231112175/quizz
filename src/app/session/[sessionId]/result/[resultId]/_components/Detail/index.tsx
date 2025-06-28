import { type JSX } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { type QuizResults } from '../../_sections/MainSection/hooks';

type DetailProps = {
    results: QuizResults;
};

export default function Detail({ results }: DetailProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-8"
        >
            <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
            {results.questionResults.map((result, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
        Question {index + 1}
                                {result.isCorrect ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-600" />
                                )}
                            </CardTitle>
                            <Badge variant={result.isCorrect ? 'default' : 'destructive'}>
                                {result.score}/{result.maxScore} points
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">Question:</h4>
                            <p className="text-muted-foreground">{result.question}</p>
                        </div>
    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Your Answer:</h4>
                                <p className={`p-3 rounded-lg ${
                                    result.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                }`}>
                                    {Array.isArray(result.userAnswer) 
                                        ? result.userAnswer.join(', ') 
                                        : result.userAnswer || 'No answer provided'
                                    }
                                </p>
                            </div>
        
                            <div>
                                <h4 className="font-semibold mb-2">Correct Answer:</h4>
                                <p className="p-3 rounded-lg bg-green-50 text-green-800">
                                    {Array.isArray(result.correctAnswer) 
                                        ? result.correctAnswer.join(', ') 
                                        : result.correctAnswer
                                    }
                                </p>
                            </div>
                        </div>
    
                        <div>
                            <h4 className="font-semibold mb-2">Explanation:</h4>
                            <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                {/* {result.explanation} */}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </motion.div>
    );
}
