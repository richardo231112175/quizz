'use client';

import { forwardRef, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef } from 'react';
import { Root, Image, Fallback, type AvatarProps, type AvatarImageProps, type AvatarFallbackProps } from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

const Avatar: ForwardRefExoticComponent<Omit<AvatarProps & RefAttributes<HTMLSpanElement>, 'ref'> & RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<typeof Root>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Root>, ref) => (
    <Root
        ref={ref}
        className={cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
            className
        )}
        {...props}
    />
));
Avatar.displayName = Root.displayName;

const AvatarImage: ForwardRefExoticComponent<Omit<AvatarImageProps & RefAttributes<HTMLImageElement>, 'ref'> & RefAttributes<HTMLImageElement>> = forwardRef<HTMLImageElement, ComponentPropsWithoutRef<typeof Image>>(({ className, src, alt, ...props }: ComponentPropsWithoutRef<typeof Image>, ref) => (
    <Image
        ref={ref}
        src={src}
        alt={alt}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
    />
));
AvatarImage.displayName = Image.displayName;

const AvatarFallback: ForwardRefExoticComponent<Omit<AvatarFallbackProps & RefAttributes<HTMLSpanElement>, 'ref'> & RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<typeof Fallback>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Fallback>, ref) => (
    <Fallback
        ref={ref}
        className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-muted',
            className
        )}
        {...props}
    />
));
AvatarFallback.displayName = Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
