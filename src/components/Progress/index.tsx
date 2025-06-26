'use client';

import { forwardRef, type ForwardRefExoticComponent, type ComponentPropsWithoutRef, type RefAttributes } from 'react';
import { Root, Indicator, type ProgressProps } from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress: ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<ForwardRefExoticComponent<ProgressProps & RefAttributes<HTMLDivElement>>>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Root>>(({ className, value, ...props }: ComponentPropsWithoutRef<typeof Root>, ref) => (
    <Root
        ref={ref}
        className={cn(
            'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
            className
        )}
        {...props}
    >
        <Indicator
            className="h-full w-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </Root>
));
Progress.displayName = Root.displayName;

export { Progress };
