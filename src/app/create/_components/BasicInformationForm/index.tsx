import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';

type BasicInformationFormProps = {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
};

export default function BasicInformationForm({ title, setTitle, description, setDescription }: BasicInformationFormProps): JSX.Element {
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
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your quiz"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none scrollbar-thin scrollbar-track-muted/50 scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
