import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUnfinishedQuiz, abort, type getUnfinishedQuizReturn } from './actions';

export type useUnfinishedQuizType = {
    show: boolean;
    abortQuiz: () => Promise<void>;
    continueQuiz: () => void;
};

export function useUnfinishedQuiz(): useUnfinishedQuizType {
    const [ show, setShow ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ sessionId, setSessionId ]: [ number | null, Dispatch<SetStateAction<number | null>> ] = useState<number | null>(null);
    const [ playId, setPlayId ]: [ number | null, Dispatch<SetStateAction<number | null>> ] = useState<number | null>(null);

    const { isSignedIn }: { isSignedIn: boolean | undefined} = useUser();

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        async function checkUnfinishedQuiz(): Promise<void> {
            if (!isSignedIn) return;

            const unfinished: getUnfinishedQuizReturn | void = await getUnfinishedQuiz();

            setShow(!!unfinished);
            setPlayId(unfinished?.id || null);
            setSessionId(unfinished?.quiz_session_id || null);
        }

        checkUnfinishedQuiz();
    }, [ isSignedIn ]);

    async function abortQuiz(): Promise<void> {
        setShow(false);
        setSessionId(null);
        setPlayId(null);
        await abort(playId!);
    }

    function continueQuiz(): void {
        router.push(`/session/${sessionId}/play`);
        setShow(false);
        setSessionId(null);
        setPlayId(null);
    }

    return { show, abortQuiz, continueQuiz };
}
