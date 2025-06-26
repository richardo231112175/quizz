'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Progress } from '@/components/Progress';
import { Textarea } from '@/components/Textarea';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Flag } from 'lucide-react';

// Sample quiz data for Advanced Physics Challenge
const QUIZ_DATA = {
    id: '3',
    title: 'Advanced Physics Challenge',
    totalQuestions: 5, // Actually 5 questions despite showing 25 in description
    timeLimit: 30 * 60, // 30 minutes in seconds
    questionTimeLimit: 30, // 30 seconds per question
    questions: [
        {
            id: '1',
            type: 'single',
            question: 'What is the fundamental principle behind quantum entanglement?',
            image: null,
            timeLimit: 30,
            maxScore: 20,
            options: [
                'Particles can communicate faster than light',
                'Measurement of one particle instantly affects its entangled partner',
                'Particles share the same physical location',
                'Energy is conserved across entangled systems',
            ],
            correctAnswer: 1,
            explanation: 'Quantum entanglement means that measurement of one particle\'s quantum state instantly determines the state of its entangled partner, regardless of distance. This doesn\'t involve faster-than-light communication but rather correlated quantum states.',
        },
        {
            id: '2',
            type: 'multiple',
            question: 'Which of the following are consequences of Einstein\'s theory of special relativity?',
            image: null,
            timeLimit: 30,
            maxScore: 25,
            options: [
                'Time dilation at high velocities',
                'Length contraction in the direction of motion',
                'Mass-energy equivalence (E=mc²)',
                'Gravitational time dilation',
            ],
            correctAnswers: [ 0, 1, 2 ],
            explanation: 'Special relativity predicts time dilation, length contraction, and mass-energy equivalence. Gravitational time dilation is a consequence of general relativity, not special relativity.',
        },
        {
            id: '3',
            type: 'single',
            question: 'In the Standard Model of particle physics, which particle is responsible for the weak nuclear force?',
            image: null,
            timeLimit: 30,
            maxScore: 20,
            options: [
                'Photon',
                'Gluon',
                'W and Z bosons',
                'Higgs boson',
            ],
            correctAnswer: 2,
            explanation: 'The W and Z bosons are the gauge bosons that mediate the weak nuclear force. Photons mediate electromagnetic force, gluons mediate strong force, and the Higgs boson gives mass to particles.',
        },
        {
            id: '4',
            type: 'open',
            question: 'Explain the concept of wave-particle duality and provide an example of an experiment that demonstrates this principle.',
            image: null,
            timeLimit: 30,
            maxScore: 30,
            correctAnswer: 'Wave-particle duality is the concept that all matter and energy exhibit both wave-like and particle-like properties. The double-slit experiment demonstrates this: when electrons are fired through two slits, they create an interference pattern (wave behavior), but when observed, they behave as particles going through one slit or the other.',
            explanation: 'Wave-particle duality is fundamental to quantum mechanics. The double-slit experiment is the classic demonstration, showing that particles like electrons and photons exhibit wave interference when unobserved, but particle-like behavior when measured.',
        },
        {
            id: '5',
            type: 'single',
            question: 'What is the maximum theoretical efficiency of a heat engine operating between two thermal reservoirs according to the Carnot cycle?',
            image: null,
            timeLimit: 30,
            maxScore: 20,
            options: [
                '1 - (T_cold / T_hot)',
                '1 - (T_hot / T_cold)',
                '(T_hot - T_cold) / T_hot',
                'Both A and C are correct',
            ],
            correctAnswer: 3,
            explanation: 'The Carnot efficiency is η = 1 - (T_cold / T_hot) = (T_hot - T_cold) / T_hot, where temperatures are in Kelvin. Both expressions A and C are mathematically equivalent and represent the maximum theoretical efficiency.',
        },
    ],
};

export default function PlayQuizPage() {
    const params = useParams();
    const router = useRouter();
  
    // Quiz state
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
    const [ answers, setAnswers ] = useState<Record<string, any>>({});
    const [ showAnswer, setShowAnswer ] = useState(false);
    const [ quizCompleted, setQuizCompleted ] = useState(false);
  
    // Timer state
    const [ totalTimeRemaining, setTotalTimeRemaining ] = useState(QUIZ_DATA.timeLimit);
    const [ questionTimeRemaining, setQuestionTimeRemaining ] = useState(QUIZ_DATA.questionTimeLimit);
    const [ isQuestionTimerActive, setIsQuestionTimerActive ] = useState(true);
  
    // UI state
    const [ selectedAnswers, setSelectedAnswers ] = useState<number[]>([]);
    const [ openAnswer, setOpenAnswer ] = useState('');

    const currentQuestion = QUIZ_DATA.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === QUIZ_DATA.questions.length - 1;

    // Timer effects
    useEffect(() => {
        if (quizCompleted) return;

        const interval = setInterval(() => {
            setTotalTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleQuizComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [ quizCompleted ]);

    useEffect(() => {
        if (quizCompleted || showAnswer || !isQuestionTimerActive) return;

        const interval = setInterval(() => {
            setQuestionTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [ currentQuestionIndex, quizCompleted, showAnswer, isQuestionTimerActive ]);

    // Reset question timer when moving to next question
    useEffect(() => {
        if (!showAnswer) {
            setQuestionTimeRemaining(currentQuestion.timeLimit);
            setIsQuestionTimerActive(true);
        }
    }, [ currentQuestionIndex, showAnswer, currentQuestion.timeLimit ]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimeUp = () => {
        setIsQuestionTimerActive(false);
        if (!answers[currentQuestion.id]) {
            // Auto-submit empty answer when time runs out
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: null }));
        }
        setShowAnswer(true);
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showAnswer) return;

        if (currentQuestion.type === 'single') {
            setSelectedAnswers([ answerIndex ]);
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }));
        } else if (currentQuestion.type === 'multiple') {
            const newSelected = selectedAnswers.includes(answerIndex)
                ? selectedAnswers.filter((i) => i !== answerIndex)
                : [ ...selectedAnswers, answerIndex ];
            setSelectedAnswers(newSelected);
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: newSelected }));
        }
    };

    const handleOpenAnswerSubmit = () => {
        if (showAnswer || !openAnswer.trim()) return;
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: openAnswer.trim() }));
        setIsQuestionTimerActive(false);
        setShowAnswer(true);
    };

    const handleSubmitAnswer = () => {
        if (showAnswer) return;
    
        setIsQuestionTimerActive(false);
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            handleQuizComplete();
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setShowAnswer(false);
            setSelectedAnswers([]);
            setOpenAnswer('');
        }
    };

    const handleQuizComplete = () => {
        setQuizCompleted(true);
        setIsQuestionTimerActive(false);
    
        // Calculate results and navigate to results page
        const results = calculateResults();
        localStorage.setItem('quizResults', JSON.stringify(results));
        router.push(`/quiz/${params.quizId}/results`);
    };

    const calculateResults = () => {
        let totalScore = 0;
        let correctAnswers = 0;
        const questionResults = [];

        QUIZ_DATA.questions.forEach((question, index) => {
            const userAnswer = answers[question.id];
            let isCorrect = false;
            let score = 0;

            if (question.type === 'single') {
                isCorrect = userAnswer === question.correctAnswer;
                score = isCorrect ? question.maxScore : 0;
            } else if (question.type === 'multiple') {
                const correctSet = new Set(question.correctAnswers);
                const userSet = new Set(userAnswer || []);
                isCorrect = correctSet.size === userSet.size && 
                   [ ...correctSet ].every((x) => userSet.has(x));
                score = isCorrect ? question.maxScore : 0;
            } else if (question.type === 'open') {
                // Simple keyword matching for demo - in real app would use more sophisticated scoring
                const keywords = question.correctAnswer.toLowerCase().split(' ');
                const userWords = (userAnswer || '').toLowerCase().split(' ');
                const matchCount = keywords.filter((keyword) => 
                    userWords.some((word) => word.includes(keyword) || keyword.includes(word))
                ).length;
                score = Math.round((matchCount / keywords.length) * question.maxScore);
                isCorrect = score >= question.maxScore * 0.7; // 70% threshold
            }

            if (isCorrect) correctAnswers++;
            totalScore += score;

            questionResults.push({
                question: question.question,
                userAnswer,
                correctAnswer: question.type === 'open' ? question.correctAnswer : 
                    question.type === 'single' ? question.options[question.correctAnswer] :
                        question.correctAnswers?.map((i) => question.options[i]),
                isCorrect,
                score,
                maxScore: question.maxScore,
                explanation: question.explanation,
            });
        });

        const maxPossibleScore = QUIZ_DATA.questions.reduce((sum, q) => sum + q.maxScore, 0);
        const percentage = Math.round((totalScore / maxPossibleScore) * 100);

        return {
            quizTitle: QUIZ_DATA.title,
            totalQuestions: QUIZ_DATA.questions.length,
            correctAnswers,
            totalScore,
            maxPossibleScore,
            percentage,
            timeSpent: QUIZ_DATA.timeLimit - totalTimeRemaining,
            questionResults,
        };
    };

    const getAnswerStatus = (answerIndex: number) => {
        if (!showAnswer) return 'default';
    
        if (currentQuestion.type === 'single') {
            if (answerIndex === currentQuestion.correctAnswer) return 'correct';
            if (answerIndex === answers[currentQuestion.id]) return 'incorrect';
        } else if (currentQuestion.type === 'multiple') {
            const isCorrect = currentQuestion.correctAnswers?.includes(answerIndex);
            const isSelected = selectedAnswers.includes(answerIndex);
            if (isCorrect) return 'correct';
            if (isSelected && !isCorrect) return 'incorrect';
        }
    
        return 'default';
    };

    const getAnswerButtonClass = (status: string) => {
        switch (status) {
        case 'correct': return 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'incorrect': return 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return 'hover:bg-muted';
        }
    };

    if (quizCompleted) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <Card className="max-w-md mx-auto">
                    <CardContent className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold mb-2">Calculating Results...</h2>
                        <p className="text-muted-foreground">Please wait while we process your answers.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold">{QUIZ_DATA.title}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span className={totalTimeRemaining < 300 ? 'text-red-600 font-semibold' : ''}>
                                        {formatTime(totalTimeRemaining)}
                                    </span>
                                </div>
                                <Badge variant="outline">
                  Question {currentQuestionIndex + 1} of {QUIZ_DATA.questions.length}
                                </Badge>
                            </div>
                        </div>
            
                        <Progress 
                            value={(currentQuestionIndex / QUIZ_DATA.questions.length) * 100} 
                            className="h-2"
                        />
                    </div>

                    {/* Question Card */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                  Question {currentQuestionIndex + 1}
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span className={`text-sm font-mono ${
                                        questionTimeRemaining <= 10 ? 'text-red-600 font-bold' : 
                                            questionTimeRemaining <= 20 ? 'text-yellow-600' : ''
                                    }`}>
                                        {formatTime(questionTimeRemaining)}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
                                {currentQuestion.image && (
                                    <img 
                                        src={currentQuestion.image} 
                                        alt="Question illustration"
                                        className="w-full max-w-md mx-auto rounded-lg mb-4"
                                    />
                                )}
                            </div>

                            {/* Answer Options */}
                            {currentQuestion.type !== 'open' ? (
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, index) => {
                                        const status = getAnswerStatus(index);
                                        const isSelected = selectedAnswers.includes(index);
                    
                                        return (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleAnswerSelect(index)}
                                                disabled={showAnswer}
                                                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                                                    isSelected && !showAnswer ? 'border-primary bg-primary/5' : 'border-border'
                                                } ${getAnswerButtonClass(status)} ${
                                                    showAnswer ? 'cursor-default' : 'cursor-pointer'
                                                }`}
                                                whileHover={!showAnswer ? { scale: 1.01 } : {}}
                                                whileTap={!showAnswer ? { scale: 0.99 } : {}}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                        currentQuestion.type === 'single' ? 'rounded-full' : 'rounded'
                                                    } ${
                                                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                                                    }`}>
                                                        {isSelected && (
                                                            currentQuestion.type === 'single' ? 
                                                                <div className="w-2 h-2 bg-current rounded-full" /> :
                                                                <CheckCircle className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    <span className="flex-1">{option}</span>
                                                    {showAnswer && status === 'correct' && (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    )}
                                                    {showAnswer && status === 'incorrect' && (
                                                        <XCircle className="h-5 w-5 text-red-600" />
                                                    )}
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Textarea
                                        value={openAnswer}
                                        onChange={(e) => setOpenAnswer(e.target.value)}
                                        placeholder="Type your answer here..."
                                        disabled={showAnswer}
                                        className="min-h-[120px]"
                                    />
                                    {!showAnswer && (
                                        <Button 
                                            onClick={handleOpenAnswerSubmit}
                                            disabled={!openAnswer.trim()}
                                        >
                      Submit Answer
                                        </Button>
                                    )}
                                </div>
                            )}

                            {/* Submit Button for Multiple Choice */}
                            {currentQuestion.type !== 'open' && !showAnswer && (
                                <Button 
                                    onClick={handleSubmitAnswer}
                                    disabled={selectedAnswers.length === 0}
                                    className="w-full"
                                >
                  Submit Answer
                                </Button>
                            )}

                            {/* Answer Explanation */}
                            <AnimatePresence>
                                {showAnswer && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-muted/50 rounded-lg p-4"
                                    >
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <Flag className="h-4 w-4" />
                      Explanation
                                        </h3>
                                        <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    {showAnswer && (
                        <div className="flex justify-between">
                            <Button 
                                variant="outline" 
                                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                                disabled={currentQuestionIndex === 0}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
                            </Button>
              
                            <Button onClick={handleNextQuestion}>
                                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                                {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-2" />}
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
