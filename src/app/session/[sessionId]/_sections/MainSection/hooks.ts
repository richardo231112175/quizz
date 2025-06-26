import { useRouter } from 'next/navigation';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { startQuizAction } from './actions';

export type useQuizType = {
    pwd: string;
    setPwd: Dispatch<SetStateAction<string>>;
    showPwd: boolean;
    setShowPwd: Dispatch<SetStateAction<boolean>>;
    showPwdError: boolean;
    isStarting: boolean;
    startQuiz: () => Promise<void>;
}

export function useQuiz(sessionId: number): useQuizType {
    const [ pwd, setPwd ]: [ string, Dispatch<SetStateAction<string>> ] = useState('');
    const [ showPwd, setShowPwd ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ showPwdError, setShowPwdError ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);
    const [ isStarting, setIsStarting ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState(false);

    const router: AppRouterInstance = useRouter();

    async function startQuiz(): Promise<void> {
        if (isStarting) return;
        setIsStarting(true);
        setShowPwd(false);
        setShowPwdError(false);

        const started: number = await startQuizAction(sessionId, pwd);

        if (started === 200) {
            router.replace(`/session/${sessionId}/play`);
        } else if (started === 401) {
            setShowPwd(true);
            setShowPwdError(true);
        } else if (started === 422) {
            setShowPwd(true);
        } else if (started === 404) {
            router.replace('/');
        }

        setPwd('');
        setIsStarting(false);
    }

    return { pwd, setPwd, showPwd, setShowPwd, showPwdError, isStarting, startQuiz };
}
