import { useState, type Dispatch, type SetStateAction } from 'react';
import { type ParticipantData } from '../../page';

export type useParticipantsType = {
    exportResults: () => void;
    filteredParticipants: ParticipantData[];
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    sortBy: string;
    setSortBy: Dispatch<SetStateAction<string>>;
};

export default function useParticipants(title: string, participants: ParticipantData[]): useParticipantsType {
    const [ searchTerm, setSearchTerm ]: [ string, Dispatch<SetStateAction<string>> ] = useState('');
    const [ sortBy, setSortBy ]: [ string, Dispatch<SetStateAction<string>> ] = useState('rank');

    const filteredParticipants: ParticipantData[] = participants
        .filter((p: ParticipantData) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a: ParticipantData, b: ParticipantData) => {
            switch (sortBy) {
            case 'rank': return a.rank - b.rank;
            case 'score': return b.score - a.score;
            case 'name': return a.name.localeCompare(b.name);
            case 'time': return a.timeSpent - b.timeSpent;
            default: return 0;
            }
        });

    function exportResults(): void {
        const csvContent: string = [
            [ 'Rank', 'Name', 'Email', 'Score', 'Correct Answers', 'Time Spent (min)', 'Completed At' ],
            ...filteredParticipants.map((p: ParticipantData) => [
                p.rank,
                p.name,
                p.email,
                p.score,
                `${p.correctAnswers}/${p.totalQuestions}`,
                p.timeSpent,
                new Date(p.completedAt).toLocaleString(),
            ]),
        ].map((row: (string | number)[]) => row.join(',')).join('\n');

        const blob: Blob = new Blob([ csvContent ], { type: 'text/csv' });
        const url: string = window.URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}_results.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return { exportResults, filteredParticipants, searchTerm, setSearchTerm, sortBy, setSortBy };
}
