import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { categories, type Categories } from '@/lib/categories';
import { difficulties, type Difficulties } from '@/lib/difficulties';
import { Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { type QuizSessionType } from '../../_sections/MainSection/hooks';
import { type parsedQuizSessionError } from '../../_sections/MainSection/actions';

type QuizSettingFormProps = {
    form: QuizSessionType;
    setForm: Dispatch<SetStateAction<QuizSessionType>>;
    isSubmitting: boolean;
    errors: parsedQuizSessionError[];
};

export default function QuizSettingForm({ form, setForm, isSubmitting, errors }: QuizSettingFormProps): JSX.Element {
    const categoryError: string | undefined = errors.find((error) => error.path === 'category')?.message;
    const difficultyError: string | undefined = errors.find((error) => error.path === 'difficulty')?.message;
    const timeLimitError: string | undefined = errors.find((error) => error.path === 'time_limit')?.message;
    const visibilityError: string | undefined = errors.find((error) => error.path === 'visibility')?.message;
    const passwordError: string | undefined = errors.find((error) => error.path === 'password')?.message;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={form.category}
                            onValueChange={(value) => setForm({ ...form, category: value as Categories })}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className={categoryError ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {categoryError && (
                            <p className="text-sm text-red-500 mt-1">{categoryError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                            value={form.difficulty}
                            onValueChange={(value) => setForm({ ...form, difficulty: value as Difficulties })}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className={difficultyError ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(difficulties).map((difficulty) => (
                                    <SelectItem key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {difficultyError && (
                            <p className="text-sm text-red-500 mt-1">{difficultyError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                        <Input
                            id="timeLimit"
                            type="number"
                            min="1"
                            max="120"
                            value={form.timeLimit}
                            onChange={(e) => setForm({ ...form, timeLimit: parseInt(e.target.value) || 0 })}
                            disabled={isSubmitting}
                            autoCapitalize="none"
                            autoComplete="off"
                            spellCheck="false"
                            className={timeLimitError ? 'border-red-500' : ''}
                        />
                        {timeLimitError && (
                            <p className="text-sm text-red-500 mt-1">{timeLimitError}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="visibility">Visibility</Label>
                        <Select
                            value={form.visibility}
                            onValueChange={(value) => setForm({ ...form, visibility: value as 'public' | 'private' })}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger className={visibilityError ? 'border-red-500' : ''}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[ 'Public', 'Private' ].map((option) => (
                                    <SelectItem key={option} value={option.toLowerCase()}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {visibilityError && (
                            <p className="text-sm text-red-500 mt-1">{visibilityError}</p>
                        )}
                    </div>
                </div>
                {form.visibility === 'private' && (
                    <div className="space-y-2">
                        <Label htmlFor="password">Session Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="text"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                disabled={isSubmitting}
                                autoCapitalize="none"
                                autoComplete="off"
                                spellCheck="false"
                                className={passwordError ? 'border-red-500' : ''}
                            />
                            <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                        {passwordError && (
                            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
