import { JSX } from 'react';
import { Download, Filter, Search, Trophy } from 'lucide-react';
import { TabsContent } from '@/components/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Badge } from '@/components/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/Select';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/Table';
import useParticipants, { type useParticipantsType } from './hooks';
import { ParticipantData } from '../../page';
import { formatTime } from '@/lib/formatTime';

type ParticipantsProps = {
    title: string;
    participantsData: ParticipantData[];
};

export default function Participants({ title, participantsData }: ParticipantsProps): JSX.Element {
    const { exportResults, filteredParticipants, searchTerm, setSearchTerm, sortBy, setSortBy }: useParticipantsType = useParticipants(title, participantsData);

    return (
        <TabsContent value="participants" className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Participant Results</CardTitle>
                        <Button onClick={exportResults} variant="outline">
                            <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search participants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-48">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rank">Sort by Rank</SelectItem>
                                <SelectItem value="score">Sort by Score</SelectItem>
                                <SelectItem value="name">Sort by Name</SelectItem>
                                <SelectItem value="time">Sort by Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">Rank</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-center">Score</TableHead>
                                    <TableHead className="text-center">Correct</TableHead>
                                    <TableHead className="text-center">Time</TableHead>
                                    <TableHead>Completed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredParticipants.map((participant) => (
                                    <TableRow key={participant.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center justify-center">
                                                {participant.rank <= 3 && (
                                                    <Trophy className={`h-4 w-4 mr-1 ${
                                                        participant.rank === 1 ? 'text-yellow-500' :
                                                            participant.rank === 2 ? 'text-gray-400' :
                                                                'text-amber-600'
                                                    }`} />
                                                )}
                                                #{participant.rank}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{participant.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{participant.email}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={participant.score >= 80 ? 'default' : participant.score >= 60 ? 'secondary' : 'destructive'}>
                                                {participant.score}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {participant.correctAnswers}/{participant.totalQuestions}
                                        </TableCell>
                                        <TableCell className="text-center">{participant.timeSpent}m</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatTime(participant.completedAt)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
