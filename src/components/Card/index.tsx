import { forwardRef, type ForwardRefExoticComponent, type HTMLAttributes, type RefAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardType = ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
const Card: CardType = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
    <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

type CardHeaderType = ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
const CardHeader: CardHeaderType = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

type CardTitleType = ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>;
const CardTitle: CardTitleType = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }: HTMLAttributes<HTMLHeadingElement>, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

type CardDescriptionType = ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;
const CardDescription: CardDescriptionType = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }: HTMLAttributes<HTMLParagraphElement>, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

type CardContentType = ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
const CardContent: CardContentType = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

type CardFooterType = ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
const CardFooter: CardFooterType = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }: HTMLAttributes<HTMLDivElement>, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
