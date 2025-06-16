'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/Dialog';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Textarea } from '@/components/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Clock, Edit, Plus, Users, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/DropdownMenu';
import Link from 'next/link';

// Ambil dari database
const SAMPLE_QUIZZES = [
    {
        id: '1',
        title: 'Basic Science Quiz',
        description: 'Test your knowledge of basic scientific concepts',
        questionCount: 15,
        createdAt: '2024-03-20',
        sessions: 3,
    },
    {
        id: '2',
        title: 'World History',
        description: 'Explore major historical events and figures',
        questionCount: 20,
        createdAt: '2024-03-19',
        sessions: 5,
    },
];

// Biarkan saja dulu
const SAMPLE_SESSIONS = [
    {
        id: '1',
        quizId: '1',
        title: 'Science Quiz - March 2024',
        description: 'Monthly science assessment for students',
        category: 'Science',
        difficulty: 'Medium',
        participants: 45,
        status: 'active',
        openTime: '2024-03-20T10:00',
        closeTime: '2024-03-25T23:59',
        timeLimit: 30,
        visibility: 'public',
        singleChoiceCount: 8,
        multipleChoiceCount: 4,
        openEndedCount: 3,
    },
    {
        id: '2',
        quizId: '2',
        title: 'History Final Exam',
        description: 'Final examination for history course',
        category: 'History',
        difficulty: 'Hard',
        participants: 32,
        status: 'upcoming',
        openTime: '2024-03-22T09:00',
        closeTime: '2024-03-22T11:00',
        timeLimit: 60,
        visibility: 'private',
        singleChoiceCount: 12,
        multipleChoiceCount: 6,
        openEndedCount: 2,
    },
];

// Pakai lib/categories.ts
const CATEGORIES = [
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'technology', name: 'Technology' },
    { id: 'arts', name: 'Arts' },
    { id: 'sports', name: 'Sports' },
    { id: 'music', name: 'Music' },
    { id: 'health', name: 'Health' },
];

// Usahakan tidak usah dipake (pake lib/difficulties.ts aja)
const DIFFICULTIES = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
];

// Pakai lib/difficulties.ts
const difficultyColors = {
    'Easy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Hard': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

// Buat lib baru untuk status (lib/statuses.ts)
const statusColors = {
    'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'ended': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export default function DashboardPage() {
    const [ activeTab, setActiveTab ] = useState('quizzes');
    const [ editingSession, setEditingSession ] = useState<any>(null);
    const [ sessions, setSessions ] = useState(SAMPLE_SESSIONS);

    const handleDeleteSession = (sessionId: string) => {
        setSessions(sessions.filter((s) => s.id !== sessionId));
    };

    const handleUpdateSession = (sessionId: string, updates: any) => {
        setSessions(sessions.map((s) => s.id === sessionId ? { ...s, ...updates } : s));
        setEditingSession(null);
    };

    const SessionEditDialog = ({ session, onSave, onClose }: { session: any; onSave: (updates: any) => void; onClose: () => void }) => {
        const [ formData, setFormData ] = useState({
            title: session.title,
            description: session.description,
            category: session.category.toLowerCase(),
            difficulty: session.difficulty.toLowerCase(),
            timeLimit: session.timeLimit,
            visibility: session.visibility,
            openTime: session.openTime.slice(0, 16),
            closeTime: session.closeTime.slice(0, 16),
            singleChoiceCount: session.singleChoiceCount,
            multipleChoiceCount: session.multipleChoiceCount,
            openEndedCount: session.openEndedCount,
        });

        const handleSave = () => {
            onSave(formData);
        };

        return (
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Session</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Session Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter session title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter session description"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Difficulty</Label>
                            <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {DIFFICULTIES.map((diff) => (
                                        <SelectItem key={diff.id} value={diff.id}>{diff.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Time Limit (minutes)</Label>
                            <Input
                                type="number"
                                value={formData.timeLimit}
                                onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Visibility</Label>
                            <Select value={formData.visibility} onValueChange={(value) => setFormData({ ...formData, visibility: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Single Choice</Label>
                            <Input
                                type="number"
                                value={formData.singleChoiceCount}
                                onChange={(e) => setFormData({ ...formData, singleChoiceCount: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Multiple Choice</Label>
                            <Input
                                type="number"
                                value={formData.multipleChoiceCount}
                                onChange={(e) => setFormData({ ...formData, multipleChoiceCount: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Open Ended</Label>
                            <Input
                                type="number"
                                value={formData.openEndedCount}
                                onChange={(e) => setFormData({ ...formData, openEndedCount: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Open Time</Label>
                            <Input
                                type="datetime-local"
                                value={formData.openTime}
                                onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Close Time</Label>
                            <Input
                                type="datetime-local"
                                value={formData.closeTime}
                                onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                </div>
            </DialogContent>
        );
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold tracking-tight">My Dashboard</h1>
                        <Button asChild>
                            <Link href="/create">
                                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
                            </Link>
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-8">
                            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
                            <TabsTrigger value="sessions">Quiz Sessions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="quizzes">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {SAMPLE_QUIZZES.map((quiz) => (
                                    <Card key={quiz.id} className="pb-12 relative">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-xl font-semibold">{quiz.title}</CardTitle>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/quiz/${quiz.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                                            <div className="flex flex-col justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="">{quiz.questionCount} questions</span>
                                                    <span>{quiz.sessions} sessions</span>
                                                </div>
                                                <div className="absolute bottom-6 right-6">
                                                    <Button className="w-fit" variant="outline" size="sm" asChild>
                                                        <Link href={`/quiz-session/${quiz.id}`}>
                                                            <Plus className="h-4 w-4 mr-2" /> New Session
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="sessions">
                            <div className="grid grid-cols-1 gap-6">
                                {sessions.map((session) => (
                                    <Card key={session.id}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <div>
                                                <CardTitle className="text-xl font-semibold">{session.title}</CardTitle>
                                                <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                                                <div className="flex gap-2 mt-2">
                                                    <Badge>{session.category}</Badge>
                                                    <Badge className={difficultyColors[session.difficulty as keyof typeof difficultyColors]}>
                                                        {session.difficulty}
                                                    </Badge>
                                                    <Badge className={statusColors[session.status as keyof typeof statusColors]}>
                                                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                                    </Badge>
                                                    <Badge variant="outline" className="capitalize">{session.visibility}</Badge>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/session/${session.id}`}>
                                                            <Eye className="h-4 w-4 mr-2" />
                              View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setEditingSession(session)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                            Edit Session
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDeleteSession(session.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                            Delete Session
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        <span>
                                                            {new Date(session.openTime).toLocaleDateString()} - {new Date(session.closeTime).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users className="h-4 w-4 mr-1" />
                                                        <span>{session.participants} participants</span>
                                                    </div>
                                                    <span>{session.timeLimit} min limit</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-muted-foreground">
                                                {session.singleChoiceCount} Single • {session.multipleChoiceCount} Multiple • {session.openEndedCount} Open Ended
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {editingSession && (
                        <Dialog open={!!editingSession} onOpenChange={() => setEditingSession(null)}>
                            <SessionEditDialog
                                session={editingSession}
                                onSave={(updates) => handleUpdateSession(editingSession.id, updates)}
                                onClose={() => setEditingSession(null)}
                            />
                        </Dialog>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
