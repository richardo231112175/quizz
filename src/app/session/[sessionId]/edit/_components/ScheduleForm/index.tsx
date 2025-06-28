import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { type QuizSessionType } from '../../_sections/MainSection/hooks';
import { type parsedQuizSessionError } from '../../_sections/MainSection/actions';

type ScheduleFormProps = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    isSubmitting: boolean;
    errors: parsedQuizSessionError[];
};

export default function ScheduleForm({ form, setForm,isSubmitting, errors }: ScheduleFormProps): JSX.Element {
    const openTimeError: string | undefined = errors.find((error) => error.path === 'open_time')?.message;
    const closeTimeError: string | undefined = errors.find((error) => error.path === 'close_time')?.message;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="openTime">Open Time</Label>
                        <Input
                            id="openTime"
                            type="datetime-local"
                            value={form.openTime}
                            onChange={(e) => setForm({ ...form, openTime : e.target.value })}
                            className={openTimeError ? 'border-red-500' : ''}
                            disabled={form.enable || isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {openTimeError && (
                            <p className="text-sm text-red-500 mt-1">{openTimeError}</p>
                        )}
                        
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="closeTime">Close Time</Label>
                        <Input
                            id="closeTime"
                            type="datetime-local"
                            value={form.closeTime}
                            onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
                            className={closeTimeError ? 'border-red-500' : ''}
                            disabled={form.enable || isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        {closeTimeError && (
                            <p className="text-sm text-red-500 mt-1">{closeTimeError}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
