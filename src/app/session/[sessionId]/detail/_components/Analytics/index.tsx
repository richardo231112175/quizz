import { type JSX } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { TabsContent } from '@/components/Tabs';
import { type ParticipantData } from '../../page';
import { formatText } from '@/lib/formatText';

type AnalyticsProps = {
    participants: ParticipantData[];
    totalQuestions: number;
    visibility: string;
    timeLimit: number;
    category: string;
};

export default function Analytics({ participants, totalQuestions, visibility, timeLimit, category }: AnalyticsProps): JSX.Element {
    const averageTime: number = participants.length > 0 ? Math.round(participants.reduce((sum, p) => sum + p.timeSpent, 0) / participants.length) : 0;
    const fastestCompletion: number = participants.length > 0 ? Math.min(...participants.map((p) => p.timeSpent)) : 0;
    const slowestCompletion: number = participants.length > 0 ? Math.max(...participants.map((p) => p.timeSpent)) : 0;
    const completionRate: number = participants.length > 0 ? (participants.filter((p) => p.completedAt).length / participants.length) * 100 : 0;

    return (
        <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Score Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>90-100%</span>
                                <span>{participants.filter((p) => p.score >= 90).length} participants</span>
                            </div>
                            <div className="flex justify-between">
                                <span>80-89%</span>
                                <span>{participants.filter((p) => p.score >= 80 && p.score < 90).length} participants</span>
                            </div>
                            <div className="flex justify-between">
                                <span>70-79%</span>
                                <span>{participants.filter((p) => p.score >= 70 && p.score < 80).length} participants</span>
                            </div>
                            <div className="flex justify-between">
                                <span>60-69%</span>
                                <span>{participants.filter((p) => p.score >= 60 && p.score < 70).length} participants</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Below 60%</span>
                                <span>{participants.filter((p) => p.score < 60).length} participants</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Time Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Average Time:</span>
                                <span>{averageTime} minutes</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Fastest Completion:</span>
                                <span>{fastestCompletion} minutes</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Slowest Completion:</span>
                                <span>{slowestCompletion} minutes</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Completion Rate:</span>
                                <span>{completionRate}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Session Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Total Questions:</span>
                                <span>{totalQuestions}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Visibility:</span>
                                <span className="capitalize">{formatText(visibility)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Time Limit:</span>
                                <span>{timeLimit} minutes</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Category:</span>
                                <span>{formatText(category)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
    );
}
