'use client';

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef } from 'react';
import { Root, type SeparatorProps } from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

const Separator: ForwardRefExoticComponent<Omit<SeparatorProps & RefAttributes<HTMLDivElement>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Root>>(({ className, orientation = 'horizontal', decorative = true, ...props }: ComponentPropsWithoutRef<typeof Root>, ref) => (
    <Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
            'shrink-0 bg-border',
            orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
            className
        )}
        {...props}
    />
));
Separator.displayName = Root.displayName;

export { Separator };
