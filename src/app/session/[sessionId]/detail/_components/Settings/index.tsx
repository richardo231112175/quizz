import { type JSX } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Label } from '@/components/Label';
import { TabsContent } from '@/components/Tabs';
import { formatTime } from '@/lib/formatTime';
import { formatText } from '@/lib/formatText';

type SettingsProps = {
    openTime: Date;
    closeTime: Date;
    visibility: string;
    totalQuestions: number;
    singleChoiceCount: number;
    multipleChoiceCount: number;
    openEndedCount: number;
};

export default function Settings({ openTime, closeTime, visibility, totalQuestions, singleChoiceCount, multipleChoiceCount, openEndedCount }: SettingsProps): JSX.Element {
    return (
        <TabsContent value="settings" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Session Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium">Open Time</Label>
                            <p className="text-sm text-muted-foreground">
                                {formatTime(openTime)}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Close Time</Label>
                            <p className="text-sm text-muted-foreground">
                                {formatTime(closeTime)}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium">Visibility</Label>
                            <p className="text-sm text-muted-foreground capitalize">
                                {formatText(visibility)}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Total Questions</Label>
                            <p className="text-sm text-muted-foreground">
                                {totalQuestions}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Questions Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-sm font-medium">Single Choice</Label>
                            <p className="text-sm text-muted-foreground">
                                {singleChoiceCount} questions
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Multiple Choice</Label>
                            <p className="text-sm text-muted-foreground">
                                {multipleChoiceCount} questions
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Open Ended</Label>
                            <p className="text-sm text-muted-foreground">
                                {openEndedCount} questions
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
