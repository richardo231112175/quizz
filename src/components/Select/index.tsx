'use client';

import { forwardRef, type FC, type ForwardRefExoticComponent, type RefAttributes, type ComponentPropsWithoutRef } from 'react';
import { Root, Group, Value, Trigger, Icon, ScrollUpButton, ScrollDownButton, Portal, Content, Viewport, Label, Item, ItemIndicator, ItemText, Separator, type SelectProps, type SelectGroupProps, type SelectValueProps } from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select: FC<SelectProps> = Root;

const SelectGroup: ForwardRefExoticComponent<SelectGroupProps & RefAttributes<HTMLDivElement>> = Group;

const SelectValue: ForwardRefExoticComponent<SelectValueProps & RefAttributes<HTMLSpanElement>> = Value;

const SelectTrigger: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Trigger> & RefAttributes<HTMLButtonElement>> = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<typeof Trigger>>(({ className, children, ...props }: ComponentPropsWithoutRef<typeof Trigger>, ref) => (
    <Trigger
        ref={ref}
        className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className
        )}
        {...props}
    >
        {children}
        <Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </Icon>
    </Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

const SelectScrollUpButton: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof ScrollUpButton> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ScrollUpButton>>(({ className, ...props }: ComponentPropsWithoutRef<typeof ScrollUpButton>, ref) => (
    <ScrollUpButton
        ref={ref}
        className={cn(
            'flex cursor-default items-center justify-center py-1',
            className
        )}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

const SelectScrollDownButton: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof ScrollDownButton> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ScrollDownButton>>(({ className, ...props }: ComponentPropsWithoutRef<typeof ScrollDownButton>, ref) => (
    <ScrollDownButton
        ref={ref}
        className={cn(
            'flex cursor-default items-center justify-center py-1',
            className
        )}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </ScrollDownButton>
));
SelectScrollDownButton.displayName =
  ScrollDownButton.displayName;

const SelectContent: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Content> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Content>>(({ className, children, position = 'popper', ...props }: ComponentPropsWithoutRef<typeof Content>, ref) => (
    <Portal>
        <Content
            ref={ref}
            className={cn(
                'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <Viewport
                className={cn(
                    'p-1',
                    position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                )}
            >
                {children}
            </Viewport>
            <SelectScrollDownButton />
        </Content>
    </Portal>
));
SelectContent.displayName = Content.displayName;

const SelectLabel: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Label> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Label>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Label>, ref) => (
    <Label
        ref={ref}
        className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
        {...props}
    />
));
SelectLabel.displayName = Label.displayName;

const SelectItem: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Item> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Item>>(({ className, children, ...props }: ComponentPropsWithoutRef<typeof Item>, ref) => (
    <Item
        ref={ref}
        className={cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ItemIndicator>
                <Check className="h-4 w-4" />
            </ItemIndicator>
        </span>

        <ItemText>{children}</ItemText>
    </Item>
));
SelectItem.displayName = Item.displayName;

const SelectSeparator: ForwardRefExoticComponent<ComponentPropsWithoutRef<typeof Separator> & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Separator>>(({ className, ...props }: ComponentPropsWithoutRef<typeof Separator>, ref) => (
    <Separator
        ref={ref}
        className={cn('-mx-1 my-1 h-px bg-muted', className)}
        {...props}
    />
));
SelectSeparator.displayName = Separator.displayName;

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
