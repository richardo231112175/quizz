import { forwardRef, type ForwardRefExoticComponent, type InputHTMLAttributes, type RefAttributes } from 'react';
import { cn } from '@/lib/utils';

type InputType = ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>>;
const Input: InputType = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }: InputHTMLAttributes<HTMLInputElement>, ref) => (
    <input
        type={type}
        className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        ref={ref}
        {...props}
    />
));
Input.displayName = 'Input';

export { Input };
