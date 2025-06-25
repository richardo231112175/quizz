import { useState, type Dispatch, type SetStateAction } from 'react';

export type useShareButtonType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleShare: () => Promise<void>;
}

export function useShareButton(): useShareButtonType {
    const [ open, setOpen ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    async function handleShare(): Promise<void> {
        try {
            setOpen(true);
            await navigator.clipboard.writeText(window.location.href);
        } catch {}
    }

    return { open, setOpen, handleShare };
}
