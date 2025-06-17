import Link from 'next/link';
import { type JSX } from 'react';
import { type Quiz } from '../../page';
import { Edit, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';

type QuizSectionProps = {
    quizzes: Quiz[]
};

export default function QuizSection({ quizzes }: QuizSectionProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
                <Card key={quiz.id} className="pb-12 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-semibold truncate">{quiz.title}</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/quizz/${quiz.id}/edit`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        { quiz.description && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{quiz.description}</p> }
                        <div className="flex flex-col justify-between text-sm">
                            <div className="flex items-center gap-4">
                                <span>{quiz._count.questions} questions</span>
                                <span>{quiz._count.sessions} sessions</span>
                            </div>
                            <div className="absolute bottom-6 right-6">
                                <Button className="w-fit" variant="outline" size="sm" asChild>
                                    <Link href={`/quizz/${quiz.id}/session`}>
                                        <Plus className="h-4 w-4 mr-2" /> New Session
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
