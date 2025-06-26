import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { type JSX, type Dispatch, type SetStateAction } from 'react';
import { type Session } from '../../page';
import { Lock, MoreHorizontal, Eye, Edit, Trash2, Clock, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/DropdownMenu';
import { Dialog } from '@/components/Dialog';
import { Button } from '@/components/Button';
import DeleteConfirmDialog from '../../_components/DeleteConfirmDialog';
import { difficulties } from '@/lib/difficulties';
import { useSessionSection, type useSessionSectionType } from './hooks';

type SessionSectionProps = {
    sessions: Session[];
    setSessions: Dispatch<SetStateAction<Session[]>>;
};

export default function SessionSection({ sessions, setSessions }: SessionSectionProps): JSX.Element {
    const {
        openConfirmDialog,
        setOpenConfirmDialog,
        deletingIds,
        setDeleteId,
        getDate,
        getStatus,
        deleteHandler,
    }: useSessionSectionType = useSessionSection({ sessions, setSessions });

    const router: AppRouterInstance = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => {
                const category: string = session.category[0] + session.category.substring(1, session.category.length).toLowerCase();
                const difficulty: string = session.difficulty[0] + session.difficulty.substring(1, session.difficulty.length).toLowerCase();
                const { status, className }: { status: string, className: string } = getStatus(session.open_time, session.close_time);
                console.log(session);
                
                return (
                    <Card key={session.id}>
                        <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-semibold flex items-center gap-2 truncate">
                                {session.visibility === 'PRIVATE' && <Lock className="shrink-0" />}
                                {session.title}
                            </CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => router.push(`/session/${session.id}`)} disabled={deletingIds.includes(session.quiz_id)}>
                                        <Eye className="h-4 w-4 mr-2" /> View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push(`/session/${session.id}/edit`)} disabled={deletingIds.includes(session.quiz_id)}>
                                        <Edit className="h-4 w-4 mr-2" /> Edit Session
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setDeleteId(session.quiz_id);
                                            setOpenConfirmDialog(true);
                                        }}
                                        disabled={deletingIds.includes(session.quiz_id)}
                                        className="text-red-600"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete Session
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{session.description || 'No description'}</p>
                            <div className="flex gap-2">
                                <Badge>{category}</Badge>
                                <Badge className={difficulties[difficulty]}>
                                    {difficulty}
                                </Badge>
                                <Badge className={className}>
                                    {status}
                                </Badge>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center shrink-0">
                                        <Users className="h-4 w-4 mr-1" /> 10 participants
                                    </div>
                                    <div className="flex items-center shrink-0">
                                        <Clock className="h-4 w-4 mr-1" /> {session.time_limit} minutes
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {getDate(session.open_time)} - {getDate(session.close_time)}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
                <DeleteConfirmDialog handleDelete={deleteHandler} setOpen={setOpenConfirmDialog} />
            </Dialog>
        </div>
    );
}
