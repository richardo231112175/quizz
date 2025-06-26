'use client';

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes, type LabelHTMLAttributes } from 'react';
import { Root } from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/typedef
const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

type LabelType = ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & RefAttributes<HTMLLabelElement>>;
const Label: LabelType = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>, ref) => (
    <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = Root.displayName;

export { Label };
