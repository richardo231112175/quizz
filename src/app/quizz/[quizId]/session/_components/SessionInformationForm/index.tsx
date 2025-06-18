import { useRef, type JSX, type RefObject, type Dispatch, type SetStateAction } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { useSessionInformationForm, type useSessionInformationFormType } from './hooks';
import { type QuizSessionType } from '../../_sections/MainSection/hooks';
import { type parsedQuizSessionError } from '../../_sections/MainSection/actions';

type SessionInformationFormProps = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    isSubmitting: boolean;
    errors: parsedQuizSessionError[];
};

export default function SessionInformationForm({ form, setForm, isSubmitting, errors }: SessionInformationFormProps): JSX.Element {
    const { handleImageChange, handleImageDelete }: useSessionInformationFormType = useSessionInformationForm({ form, setForm, isSubmitting });

    const fileInputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

    const titleError: string | undefined = errors.find((error) => error.path === 'title')?.message;
    const descriptionError: string | undefined = errors.find((error) => error.path === 'description')?.message;
    const imageError: string | undefined = errors.find((error) => error.path === 'image')?.message;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter session title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={titleError ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                        autoCapitalize="none"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {titleError && (
                        <p className="text-sm text-red-500 mt-1">{titleError}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your quiz session"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className={descriptionError ? 'border-red-500 resize-none' : 'resize-none'}
                        disabled={isSubmitting}
                        autoCapitalize="none"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {descriptionError && (
                        <p className="text-sm text-red-500 mt-1">{descriptionError}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="image">Cover Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                if (isSubmitting) return;
                                fileInputRef.current?.click();
                            }}
                            className={imageError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            {form.image ? 'Change Image' : 'Upload Image'}
                        </Button>
                        {form.image && (
                            <div>
                                <span className="text-sm text-muted-foreground">
                                    {form.image.name}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleImageDelete}
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                    {imageError && (
                        <p className="text-sm text-red-500">{imageError}</p>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
