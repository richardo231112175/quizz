import { useState, type Dispatch, type SetStateAction } from 'react';
import { type Session } from '../../page';
import { deleteSession } from './actions';

export type useSessionSectionType = {
    openConfirmDialog: boolean;
    setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
    deletingIds: number[];
    setDeleteId: Dispatch<SetStateAction<number>>;
    getDate: (time: Date) => string;
    getStatus: (openTime: Date, closeTime: Date) => { status: string, className: string };
    deleteHandler: () => Promise<void>;
};

type useSessionSectionProps = {
    sessions: Session[];
    setSessions: Dispatch<SetStateAction<Session[]>>;
};

export function useSessionSection({ sessions, setSessions }: useSessionSectionProps): useSessionSectionType {
    const [ openConfirmDialog, setOpenConfirmDialog ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ deleteId, setDeleteId ]: [ number, Dispatch<SetStateAction<number>> ] = useState(0);
    const [ deletingIds, setDeletingIds ]: [ number[], Dispatch<SetStateAction<number[]>> ] = useState<number[]>([]);

    function getDate(time: Date): string {
        return new Date(time).toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    function getStatus(openTime: Date, closeTime: Date): { status: string, className: string } {
        const now: Date = new Date();

        if (now < openTime) {
            return { status: 'Upcoming', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
        } else if (now > closeTime) {
            return { status: 'Ended', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' };
        } else {
            return { status: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
        }
    }

    async function deleteHandler(): Promise<void> {
        if (deletingIds.includes(deleteId)) return;
        setDeletingIds([ ...deletingIds, deleteId ]);

        const success: boolean = await deleteSession(deleteId);
        if (success) {
            setSessions(sessions.filter((session) => session.id !== deleteId));
        }

        setDeletingIds(deletingIds.filter((id) => id !== deleteId));
    }

    return {
        openConfirmDialog,
        setOpenConfirmDialog,
        deletingIds,
        setDeleteId,
        getDate,
        getStatus,
        deleteHandler,
    };
}
