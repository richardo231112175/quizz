import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { type QuizSessionType } from '../../_sections/MainSection/hooks';
import { type Counts } from '../../page';
import { type parsedQuizSessionError } from '../../_sections/MainSection/actions';

type QuestionConfigurationFormProps = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    isSubmitting: boolean;
    counts: Counts;
    errors: parsedQuizSessionError[];
};

export default function QuestionConfigurationForm({ form, setForm, isSubmitting, counts, errors }: QuestionConfigurationFormProps): JSX.Element {
    const questionsError: string | undefined = errors.find((error) => error.path === 'questions')?.message;
    const singleChoiceError: string | undefined = errors.find((error) => error.path === 'single_choice')?.message;
    const multipleChoiceError: string | undefined = errors.find((error) => error.path === 'multiple_choice')?.message;
    const openEndedError: string | undefined = errors.find((error) => error.path === 'open_ended')?.message;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>
                    Question Configuration <br />
                    {questionsError && (
                        <span className="text-sm font-medium text-red-500 mt-1">{questionsError}</span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="singleChoiceCount">
                            Single Choice Questions <br />
                            <span className="text-sm text-muted-foreground">
                                ({counts.single_choice_count} available)
                            </span>
                        </Label>
                        <Input
                            id="singleChoiceCount"
                            type="number"
                            min="0"
                            max={counts.single_choice_count}
                            value={form.singleChoiceCount}
                            onChange={(e) => setForm({ ...form, singleChoiceCount: parseInt(e.target.value) || 0 })}
                            required
                            className={singleChoiceError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {singleChoiceError && (
                            <p className="text-sm text-red-500 mt-1">{singleChoiceError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="multipleChoiceCount">
                            Multiple Choice Questions <br />
                            <span className="text-sm text-muted-foreground">
                                ({counts.multiple_choice_count} available)
                            </span>
                        </Label>
                        <Input
                            id="multipleChoiceCount"
                            type="number"
                            min="0"
                            max={counts.multiple_choice_count}
                            value={form.multipleChoiceCount}
                            onChange={(e) => setForm({ ...form, multipleChoiceCount: parseInt(e.target.value) || 0 })}
                            required
                            className={multipleChoiceError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {multipleChoiceError && (
                            <p className="text-sm text-red-500 mt-1">{multipleChoiceError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="openEndedCount">
                            Open Ended Questions <br />
                            <span className="text-sm text-muted-foreground">
                                ({counts.open_ended_count} available)
                            </span>
                        </Label>
                        <Input
                            id="openEndedCount"
                            type="number"
                            min="0"
                            max={counts.open_ended_count}
                            value={form.openEndedCount}
                            onChange={(e) => setForm({ ...form, openEndedCount: parseInt(e.target.value) || 0 })}
                            required
                            className={openEndedError ? 'border-red-500' : ''}
                            disabled={isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {openEndedError && (
                            <p className="text-sm text-red-500 mt-1">{openEndedError}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
