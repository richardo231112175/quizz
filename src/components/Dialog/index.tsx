'use client';

import { forwardRef, type FC, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import { Root, Trigger, Portal, Close, Overlay, Content, Title, Description, type DialogProps, type DialogTriggerProps, type DialogCloseProps, type DialogPortalProps, type DialogOverlayProps, type DialogContentProps, type DialogTitleProps, type DialogDescriptionProps } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog: FC<DialogProps> = Root;

const DialogTrigger: ForwardRefExoticComponent<DialogTriggerProps & RefAttributes<HTMLButtonElement>> = Trigger;

const DialogPortal: FC<DialogPortalProps> = Portal;

const DialogClose: ForwardRefExoticComponent<DialogCloseProps & RefAttributes<HTMLButtonElement>> = Close;

const DialogOverlay: ForwardRefExoticComponent<Omit<DialogOverlayProps & RefAttributes<HTMLDivElement>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Overlay>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Overlay>, ref) => (
    <Overlay
        ref={ref}
        className={cn(
            'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = Overlay.displayName;

const DialogContent: ForwardRefExoticComponent<Omit<DialogContentProps & { hideCloseButton?: boolean } & RefAttributes<HTMLDivElement>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Content>>(({ className, children, hideCloseButton = false, ...props }: ComponentPropsWithoutRef<typeof Content> & { hideCloseButton?: boolean }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <Content
            ref={ref}
            className={cn(
                'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
                className
            )}
            {...props}
        >
            {children}
            { !hideCloseButton && (
                <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Close>
            )}
        </Content>
    </DialogPortal>
));
DialogContent.displayName = Content.displayName;

const DialogHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col space-y-1.5 text-center sm:text-left',
            className
        )}
        {...props}
    />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            className
        )}
        {...props}
    />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle: ForwardRefExoticComponent<Omit<DialogTitleProps & RefAttributes<HTMLDivElement>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Title>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Title>, ref) => (
    <Title
        ref={ref}
        className={cn(
            'text-lg font-semibold leading-none tracking-tight',
            className
        )}
        {...props}
    />
));
DialogTitle.displayName = Title.displayName;

const DialogDescription: ForwardRefExoticComponent<Omit<DialogDescriptionProps & RefAttributes<HTMLDivElement>, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Description>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Description>, ref) => (
    <Description
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
DialogDescription.displayName = Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
