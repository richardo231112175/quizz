import { useState, type Dispatch, type SetStateAction } from 'react';
import { type Session } from '../../page';
import { deleteSession } from './actions';

export type useSessionSectionType = {
    openConfirmDialog: boolean;
    setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
    deletingIds: number[];
    setDeleteId: Dispatch<SetStateAction<number>>;
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
        deleteHandler,
    };
}
