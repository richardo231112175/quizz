'use client';

import { forwardRef, type FC, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef } from 'react';
import { Provider, Root, Trigger, Content, type TooltipProviderProps, type TooltipProps, type TooltipTriggerProps, type TooltipContentProps } from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

const TooltipProvider: FC<TooltipProviderProps> = Provider;

const Tooltip: FC<TooltipProps> = Root;

const TooltipTrigger: ForwardRefExoticComponent<TooltipTriggerProps & RefAttributes<HTMLButtonElement>> = Trigger;

const TooltipContent: ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<ForwardRefExoticComponent<TooltipContentProps & RefAttributes<HTMLDivElement>>>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Content>>(({ className, sideOffset = 4, ...props }: ComponentPropsWithoutRef<typeof Content>, ref) => (
    <Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
        )}
        {...props}
    />
));
TooltipContent.displayName = Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
