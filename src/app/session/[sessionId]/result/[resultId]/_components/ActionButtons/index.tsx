import type { JSX, Dispatch, SetStateAction } from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/Button';
import { ShareButton } from '@/components/ShareButton';
import { type QuizResults } from '../../_sections/MainSection/hooks';
import { useActionButtons, type useActionButtonsType } from './hooks';

type ActionButtonsProps = {
    showDetail: boolean;
    setShowDetail: Dispatch<SetStateAction<boolean>>;
    results: QuizResults;
    level: string;
};

export default function ActionButtons({ showDetail, setShowDetail, results, level }: ActionButtonsProps): JSX.Element {
    const { handleDownload }: useActionButtonsType = useActionButtons(results, level);

    return (
        <div className="flex flex-wrap gap-3 justify-between mb-8">
            <Button variant={showDetail ? 'default' : 'outline'} onClick={() => setShowDetail(!showDetail)}>
                <TrendingUp className="h-4 w-4 mr-2" />
                {showDetail ? 'Hide' : 'View'} Detailed Results
            </Button>
            <div className="flex gap-3">
                <ShareButton />
                <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Download
                </Button>
            </div>
        </div>
    );
}
