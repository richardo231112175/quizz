import { type JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';

type DescriptionProps = {
    description: string | null;
};

export default function Description({ description }: DescriptionProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About This Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                    {description || 'No description'}
                </p>
            </CardContent>
        </Card>
    );
}
