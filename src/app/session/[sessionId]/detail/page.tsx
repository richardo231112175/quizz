'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/Dialog';
import { Clock, Users, Trophy, Download, Search, Filter, ArrowLeft, Edit, Settings } from 'lucide-react';
import Link from 'next/link';

// Sample session data
const SESSION_DATA = {
    id: '1',
    title: 'Science Quiz - March 2024',
    description: 'Monthly science assessment for students',
    category: 'Science',
    difficulty: 'Medium',
    status: 'active',
    openTime: '2024-03-20T10:00',
    closeTime: '2024-03-25T23:59',
    timeLimit: 30,
    visibility: 'public',
    totalQuestions: 15,
    singleChoiceCount: 8,
    multipleChoiceCount: 4,
    openEndedCount: 3,
    participants: 45,
    averageScore: 78.5,
    completionRate: 89,
};

// Sample participants data
const PARTICIPANTS_DATA = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        score: 95,
        totalQuestions: 15,
        correctAnswers: 14,
        timeSpent: 18,
        completedAt: '2024-03-21T14:30',
        rank: 1,
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        score: 87,
        totalQuestions: 15,
        correctAnswers: 13,
        timeSpent: 22,
        completedAt: '2024-03-21T15:45',
        rank: 2,
    },
    {
        id: '3',
        name: 'Carol Davis',
        email: 'carol@example.com',
        score: 82,
        totalQuestions: 15,
        correctAnswers: 12,
        timeSpent: 25,
        completedAt: '2024-03-21T16:20',
        rank: 3,
    },
    {
        id: '4',
        name: 'David Wilson',
        email: 'david@example.com',
        score: 76,
        totalQuestions: 15,
        correctAnswers: 11,
        timeSpent: 28,
        completedAt: '2024-03-21T17:10',
        rank: 4,
    },
    {
        id: '5',
        name: 'Eva Brown',
        email: 'eva@example.com',
        score: 71,
        totalQuestions: 15,
        correctAnswers: 10,
        timeSpent: 30,
        completedAt: '2024-03-21T18:00',
        rank: 5,
    },
];

const difficultyColors = {
    'Easy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Hard': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusColors = {
    'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'ended': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function SessionDetailsPage() {
    const params = useParams();
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ sortBy, setSortBy ] = useState('rank');
    const [ participants, setParticipants ] = useState(PARTICIPANTS_DATA);
    const [ showEditDialog, setShowEditDialog ] = useState(false);

    const filteredParticipants = participants
        .filter((p) => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
            case 'rank': return a.rank - b.rank;
            case 'score': return b.score - a.score;
            case 'name': return a.name.localeCompare(b.name);
            case 'time': return a.timeSpent - b.timeSpent;
            default: return 0;
            }
        });

    const exportResults = () => {
        const csvContent = [
            [ 'Rank', 'Name', 'Email', 'Score', 'Correct Answers', 'Time Spent (min)', 'Completed At' ],
            ...filteredParticipants.map((p) => [
                p.rank,
                p.name,
                p.email,
                p.score,
                `${p.correctAnswers}/${p.totalQuestions}`,
                p.timeSpent,
                new Date(p.completedAt).toLocaleString(),
            ]),
        ].map((row) => row.join(',')).join('\n');

        const blob = new Blob([ csvContent ], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${SESSION_DATA.title.replace(/\s+/g, '_')}_results.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild>
                                <Link href="/dashboard">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                                </Link>
                            </Button>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">{SESSION_DATA.title}</h1>
                                <p className="text-lg text-muted-foreground">{SESSION_DATA.description}</p>
                            </div>
                        </div>
                        <Button onClick={() => setShowEditDialog(true)}>
                            <Edit className="h-4 w-4 mr-2" />
              Edit Session
                        </Button>
                    </div>

                    {/* Session Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{SESSION_DATA.participants}</div>
                                <p className="text-xs text-muted-foreground">
                                    {SESSION_DATA.completionRate}% completion rate
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                                <Trophy className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{SESSION_DATA.averageScore}%</div>
                                <p className="text-xs text-muted-foreground">
                  Out of {SESSION_DATA.totalQuestions} questions
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Time Limit</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{SESSION_DATA.timeLimit} min</div>
                                <p className="text-xs text-muted-foreground">
                  Per session
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <Badge className={statusColors[SESSION_DATA.status as keyof typeof statusColors]}>
                                        {SESSION_DATA.status.charAt(0).toUpperCase() + SESSION_DATA.status.slice(1)}
                                    </Badge>
                                    <div className="flex gap-1">
                                        <Badge>{SESSION_DATA.category}</Badge>
                                        <Badge className={difficultyColors[SESSION_DATA.difficulty as keyof typeof difficultyColors]}>
                                            {SESSION_DATA.difficulty}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Session Details */}
                    <Tabs defaultValue="participants" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="participants">Participants</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="participants" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Participant Results</CardTitle>
                                        <Button onClick={exportResults} variant="outline">
                                            <Download className="h-4 w-4 mr-2" />
                      Export CSV
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
                                                            {new Date(participant.completedAt).toLocaleDateString()} {new Date(participant.completedAt).toLocaleTimeString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

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
                                                <span>8 participants</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>80-89%</span>
                                                <span>15 participants</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>70-79%</span>
                                                <span>12 participants</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>60-69%</span>
                                                <span>7 participants</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Below 60%</span>
                                                <span>3 participants</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Question Type Performance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Single Choice ({SESSION_DATA.singleChoiceCount} questions)</span>
                                                <span>82% avg</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Multiple Choice ({SESSION_DATA.multipleChoiceCount} questions)</span>
                                                <span>75% avg</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Open Ended ({SESSION_DATA.openEndedCount} questions)</span>
                                                <span>68% avg</span>
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
                                                <span>24 minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Fastest Completion:</span>
                                                <span>18 minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Slowest Completion:</span>
                                                <span>30 minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Completion Rate:</span>
                                                <span>89%</span>
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
                                                <span>{SESSION_DATA.totalQuestions}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Visibility:</span>
                                                <span className="capitalize">{SESSION_DATA.visibility}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Time Limit:</span>
                                                <span>{SESSION_DATA.timeLimit} minutes</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Category:</span>
                                                <span>{SESSION_DATA.category}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

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
                                                {new Date(SESSION_DATA.openTime).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Close Time</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(SESSION_DATA.closeTime).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium">Visibility</Label>
                                            <p className="text-sm text-muted-foreground capitalize">
                                                {SESSION_DATA.visibility}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Total Questions</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {SESSION_DATA.totalQuestions}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label className="text-sm font-medium">Single Choice</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {SESSION_DATA.singleChoiceCount} questions
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Multiple Choice</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {SESSION_DATA.multipleChoiceCount} questions
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium">Open Ended</Label>
                                            <p className="text-sm text-muted-foreground">
                                                {SESSION_DATA.openEndedCount} questions
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Edit Session Dialog */}
                    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Edit Session Settings</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Session Title</Label>
                                    <Input defaultValue={SESSION_DATA.title} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Input defaultValue={SESSION_DATA.description} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select defaultValue={SESSION_DATA.category.toLowerCase()}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="science">Science</SelectItem>
                                                <SelectItem value="history">History</SelectItem>
                                                <SelectItem value="geography">Geography</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Difficulty</Label>
                                        <Select defaultValue={SESSION_DATA.difficulty.toLowerCase()}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="easy">Easy</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="hard">Hard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Visibility</Label>
                                        <Select defaultValue={SESSION_DATA.visibility}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="private">Private</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Time Limit (minutes)</Label>
                                        <Input type="number" defaultValue={SESSION_DATA.timeLimit} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Single Choice</Label>
                                        <Input type="number" defaultValue={SESSION_DATA.singleChoiceCount} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Multiple Choice</Label>
                                        <Input type="number" defaultValue={SESSION_DATA.multipleChoiceCount} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Open Ended</Label>
                                        <Input type="number" defaultValue={SESSION_DATA.openEndedCount} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                                    </Button>
                                    <Button onClick={() => setShowEditDialog(false)}>
                    Save Changes
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            </div>
        </div>
    );
}
