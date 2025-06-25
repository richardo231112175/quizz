import { type JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { type userType } from '../../page';
import { getInitial } from '@/lib/getInitial';

type AuthorProps = {
    author: userType;
    quizCount: number;
};

export default function Author({ author, quizCount }: AuthorProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About the Author</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={author.imageUrl} alt={author.name} />
                        <AvatarFallback>{getInitial(author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{author.name}</h3>
                        <p className="text-muted-foreground mb-2">{quizCount} quizzes</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
