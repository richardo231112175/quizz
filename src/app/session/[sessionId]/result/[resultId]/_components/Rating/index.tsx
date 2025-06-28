import { type JSX } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { useRating, type useRatingType } from './hooks';

type RatingProps = {
    onRatingSubmit: () => void;
};

export default function Rating({ onRatingSubmit }: RatingProps): JSX.Element {
    const { rating, setRating, isSubmitting, handleSubmit }: useRatingType = useRating(onRatingSubmit);

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" /> Rate this Quiz
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        How would you rate your experience with this quiz?
                    </p>
                    <div className="flex items-center gap-1">
                        {[ 1, 2, 3, 4, 5 ].map((star: number) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="p-1 transition-colors hover:scale-110"
                                disabled={isSubmitting}
                            >
                                <Star
                                    className={`h-8 w-8 ${
                                        star <= rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={rating === 0 || isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
