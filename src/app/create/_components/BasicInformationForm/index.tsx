import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { type parsedQuizError } from '../../actions';

type BasicInformationFormProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    errors: parsedQuizError[];
    isSubmitting: boolean;
};

export default function BasicInformationForm({ title, setTitle, description, setDescription, errors, isSubmitting }: BasicInformationFormProps): JSX.Element {
    const titleError: string | undefined = errors.find((error) => error.path === 'title')?.message;
    const descriptionError: string | undefined = errors.find((error) => error.path === 'description')?.message;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Quiz Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter quiz title"
                        value={title}
                        onChange={(e) => {
                            if (isSubmitting) return;
                            setTitle(e.target.value);
                        }}
                        required
                        className={titleError ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                    />
                    {titleError && (
                        <p className="text-sm text-red-500 mt-1">{titleError}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your quiz"
                        value={description}
                        onChange={(e) => {
                            if (isSubmitting) return;
                            setDescription(e.target.value);
                        }}
                        className={`resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 ${descriptionError ? 'border-red-500' : ''}`}
                        disabled={isSubmitting}
                    />
                    {descriptionError && (
                        <p className="text-sm text-red-500 mt-1">{descriptionError}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
