import { type JSX } from 'react';
import { Share2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip';
import { Button } from '@/components/Button';
import { useShareButton, type useShareButtonType } from './hooks';

export function ShareButton(): JSX.Element {
    const { open, setOpen, handleShare }: useShareButtonType = useShareButton();

    return (
        <TooltipProvider>
            <Tooltip open={open}>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        onClick={handleShare}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Link copied!</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
